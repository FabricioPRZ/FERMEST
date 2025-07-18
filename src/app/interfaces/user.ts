
export interface User {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  code?: number | null;
}
