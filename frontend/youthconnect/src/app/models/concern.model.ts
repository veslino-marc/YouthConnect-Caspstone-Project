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
