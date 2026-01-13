package com.youthconnect.youthconnect_id.models;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TaskStatusConverter implements AttributeConverter<TaskStatus, String> {
    
    @Override
    public String convertToDatabaseColumn(TaskStatus status) {
        if (status == null) {
            return null;
        }
        return status.getDisplayValue();
    }

    @Override
    public TaskStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        return TaskStatus.fromDisplayValue(dbData);
    }
}
