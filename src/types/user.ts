export type UserToken = {
  access_token: string;
  refresh_token: string;
};

export type User = {
  id: string;
  email: string;
  password?: string;
  nickname: string;
  phone_number: string;
  profile_image: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'DELETED';
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  login_attempts: number;
  is_active: boolean;
  is_social?: boolean;
  is_superuser?: boolean;
  is_staff?: boolean;
  last_login?: string;
  email_verified: boolean;
};
