export interface Concern {
    concernId?: number;
    youthId: number;
    typeOfConcern: string;
    title: string;
    description: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ConcernDTO {
    youthId: number;
    typeOfConcern: string;
    title: string;
    description: string;
}

export interface ConcernUpdate {
    updateId?: number;
    concernId: number;
    updatedByAdminId?: number;
    updateText: string;
    createdAt?: Date;
}
