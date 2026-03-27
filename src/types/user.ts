export interface User {
  id: number;
  name: string;
  email: string;
  signup_type: "developer" | "agency";
  created_at?: string;
  updated_at?: string;
}
