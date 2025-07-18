export interface Notification {
  id?: number;
  user_id: string;
  message: string;
  status: string;

  title?: string;
  date?: Date;
  type?: string;
  read?: boolean;
  route?: string;
}