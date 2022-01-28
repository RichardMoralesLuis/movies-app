export interface LoginResponse {
  success: boolean,
  expires_at: string;
  request_token: string;
}

export interface SessionResponse {
  success: boolean,
  session_id: string;
}

export interface Account {
  id: number;
  username: string;
  name: string;
}
