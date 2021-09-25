import { User } from '../schemas/user.schema';

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: { accessToken: string; userData: userData };
}

export interface ErrorResponse {
  statusCode: number;
  error: string;
}
export interface userData {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}
