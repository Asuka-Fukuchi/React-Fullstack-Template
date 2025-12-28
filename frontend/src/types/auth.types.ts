export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string; 
  isAdmin: boolean;
}

export interface UserPublic {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  isAdmin: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;      
  user: UserPublic;    
}