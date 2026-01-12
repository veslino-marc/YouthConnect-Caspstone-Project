package com.youthconnect.youthconnect_id.models.dto;

public class ConcernDTO {
    private Integer youthId;
    private String typeOfConcern;
    private String title;
    private String description;

    // Getters and Setters
    public Integer getYouthId() {
        return youthId;
    }

    public void setYouthId(Integer youthId) {
        this.youthId = youthId;
    }

    public String getTypeOfConcern() {
        return typeOfConcern;
    }

    public void setTypeOfConcern(String typeOfConcern) {
        this.typeOfConcern = typeOfConcern;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}