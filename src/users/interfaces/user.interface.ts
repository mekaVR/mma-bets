export interface UserInterface {
  password?: string;
  userId: string;
  username: string;
  email: string;
  picture?: string;
  score?: number;
  rank?: number;
  badges?: string[];
  coinsBonus?: number;
  admin?: boolean;
}
