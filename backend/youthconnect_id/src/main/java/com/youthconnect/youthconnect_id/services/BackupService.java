package com.youthconnect.youthconnect_id.services;

public interface BackupService {
    String createBackup();
    void restoreBackup(String sqlContent);
}
