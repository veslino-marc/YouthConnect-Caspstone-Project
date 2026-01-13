package com.youthconnect.youthconnect_id.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TaskStatus {
    PENDING("Pending"),
    IN_PROGRESS("In Progress"),
    COMPLETED("Completed"),
    CANCELLED("Cancelled");

    private final String displayValue;

    TaskStatus(String displayValue) {
        this.displayValue = displayValue;
    }

    @JsonValue
    public String getDisplayValue() {
        return displayValue;
    }

    @JsonCreator
    public static TaskStatus fromDisplayValue(String displayValue) {
        if (displayValue == null) {
            return PENDING;
        }
        for (TaskStatus status : TaskStatus.values()) {
            if (status.displayValue.equals(displayValue) || status.name().equals(displayValue)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown status: " + displayValue);
    }
}
