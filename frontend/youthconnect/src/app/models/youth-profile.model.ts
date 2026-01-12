export interface YouthProfile {
    youthId?: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    suffix?: string;
    gender: string;
    birthday: string;
    contactNumber: string;
    completeAddress: string;
    civilStatus: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface YouthClassification {
    youthClassification: string;
    educationBackground: string;
    workStatus: string;
    skVoter?: boolean;
    nationalVoter?: boolean;
    pastVoter?: boolean;
    numAttendedAssemblies?: number;
    nonAttendanceReason?: string;
}

export interface YouthProfileWithClassification {
    youthId?: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    suffix?: string;
    gender: string;
    birthday: string;
    contactNumber: string;
    completeAddress: string;
    civilStatus: string;
    createdAt?: string;
    updatedAt?: string;
    
    // Classification fields
    youthClassification?: string;
    educationBackground?: string;
    workStatus?: string;
    skVoter?: boolean;
    nationalVoter?: boolean;
    pastVoter?: boolean;
    numAttendedAssemblies?: number;
    nonAttendanceReason?: string;
}

export interface YouthProfileDTO {
    firstName: string;
    middleName?: string;
    lastName: string;
    suffix?: string;
    gender: string;
    birthday: string;
    contactNumber: string;
    completeAddress: string;
    civilStatus: string;
    classification?: YouthClassification;
}
