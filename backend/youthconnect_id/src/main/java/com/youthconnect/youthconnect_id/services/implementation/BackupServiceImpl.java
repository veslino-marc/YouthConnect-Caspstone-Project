package com.youthconnect.youthconnect_id.services.implementation;

import com.youthconnect.youthconnect_id.services.BackupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class BackupServiceImpl implements BackupService {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Override
    public String createBackup() {
        StringBuilder backup = new StringBuilder();
        
        backup.append("-- YouthConnect Database Backup\n");
        backup.append("-- Generated: ").append(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))).append("\n");
        backup.append("-- ================================================\n\n");
        backup.append("SET FOREIGN_KEY_CHECKS=0;\n\n");

        try (Connection conn = dataSource.getConnection()) {
            DatabaseMetaData metaData = conn.getMetaData();
            String catalog = conn.getCatalog();
            
            // Get all tables
            ResultSet tables = metaData.getTables(catalog, null, "%", new String[]{"TABLE"});
            List<String> tableNames = new ArrayList<>();
            
            while (tables.next()) {
                tableNames.add(tables.getString("TABLE_NAME"));
            }

            for (String tableName : tableNames) {
                backup.append(exportTable(conn, tableName));
            }

        } catch (SQLException e) {
            throw new RuntimeException("Failed to create backup: " + e.getMessage(), e);
        }

        backup.append("\nSET FOREIGN_KEY_CHECKS=1;\n");
        backup.append("\n-- End of backup\n");
        
        return backup.toString();
    }

    private String exportTable(Connection conn, String tableName) {
        StringBuilder tableBackup = new StringBuilder();
        
        try {
            // Get table structure
            tableBackup.append("-- Table: ").append(tableName).append("\n");
            tableBackup.append("DROP TABLE IF EXISTS `").append(tableName).append("`;\n");
            
            // Get CREATE TABLE statement
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SHOW CREATE TABLE `" + tableName + "`");
            if (rs.next()) {
                tableBackup.append(rs.getString(2)).append(";\n\n");
            }
            rs.close();
            
            // Get table data
            rs = stmt.executeQuery("SELECT * FROM `" + tableName + "`");
            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();
            
            while (rs.next()) {
                tableBackup.append("INSERT INTO `").append(tableName).append("` VALUES (");
                
                for (int i = 1; i <= columnCount; i++) {
                    Object value = rs.getObject(i);
                    
                    if (value == null) {
                        tableBackup.append("NULL");
                    } else if (value instanceof Number) {
                        tableBackup.append(value);
                    } else if (value instanceof Boolean) {
                        tableBackup.append((Boolean) value ? 1 : 0);
                    } else {
                        String strValue = value.toString()
                                .replace("\\", "\\\\")
                                .replace("'", "\\'")
                                .replace("\n", "\\n")
                                .replace("\r", "\\r");
                        tableBackup.append("'").append(strValue).append("'");
                    }
                    
                    if (i < columnCount) {
                        tableBackup.append(", ");
                    }
                }
                
                tableBackup.append(");\n");
            }
            
            rs.close();
            stmt.close();
            tableBackup.append("\n");
            
        } catch (SQLException e) {
            tableBackup.append("-- Error exporting table ").append(tableName).append(": ").append(e.getMessage()).append("\n\n");
        }
        
        return tableBackup.toString();
    }

    @Override
    @Transactional
    public void restoreBackup(String sqlContent) {
        try {
            // Split SQL content by semicolons and execute each statement
            String[] statements = sqlContent.split(";");
            
            for (String statement : statements) {
                String trimmed = statement.trim();
                if (!trimmed.isEmpty() && !trimmed.startsWith("--")) {
                    try {
                        jdbcTemplate.execute(trimmed);
                    } catch (Exception e) {
                        // Log but continue with other statements
                        System.err.println("Error executing statement: " + e.getMessage());
                    }
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to restore backup: " + e.getMessage(), e);
        }
    }
}
