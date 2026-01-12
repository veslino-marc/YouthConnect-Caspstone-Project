export interface Event {
  eventId?: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  status?: 'waiting' | 'ongoing' | 'completed';
  createdByAdminId?: number;
  createdAt?: string;
  updatedAt?: string;
}
