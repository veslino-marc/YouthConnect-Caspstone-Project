export interface Event {
  eventId?: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  status?: 'ongoing' | 'completed';
  createdByAdminId?: number;
  createdAt?: string;
  updatedAt?: string;
}
