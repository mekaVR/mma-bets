import { UserRole } from '@users/constants/user.constants';
import { AuthenticatedRequest } from '@auth/interfaces/authenticated-request.interface';

const userId = 7;
export const mockRequest: AuthenticatedRequest = {
  user: { id: userId, username: 'testuser' },
} as AuthenticatedRequest;

export const mockUser = {
  id: userId,
  username: 'testuser',
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@example.com',
  password: 'hashed-password',
  picture: null,
  score: 0,
  role: UserRole.USER,
};

export const mockRankedUsers = [
  { ...mockUser, username: 'user2', score: 12 },
  { ...mockUser, username: 'user5', score: 10 },
  { ...mockUser, username: 'user4', score: 9 },
  mockUser,
];
