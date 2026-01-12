export interface EventAttendance {
  attendanceId?: number;
  eventId?: number;
  userId?: number;
  isAttended?: boolean;
  registeredAt?: Date;
  attendedAt?: Date;
}
