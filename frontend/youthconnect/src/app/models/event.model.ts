export interface Event {
  eventId?: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  createdByAdminId?: number;
  createdAt?: string;
  updatedAt?: string;
}
