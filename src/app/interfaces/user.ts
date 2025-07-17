export interface User {
    name: string;
    lastName: string;
    password: string;
    email: string;
    role: number;
    code?: number | null;
}
