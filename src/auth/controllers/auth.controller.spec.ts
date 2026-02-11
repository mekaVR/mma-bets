import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '@auth/services/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Partial<Record<keyof AuthService, jest.Mock>>;

  beforeEach(async () => {
    authService = {
      signUp: jest.fn(),
      signIn: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should call authService.signUp and return the result', async () => {
      const dto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password1',
      };
      const expected = { access_token: 'mock-jwt-token' };
      authService.signUp.mockResolvedValue(expected);

      const result = await controller.signUp(dto);

      expect(result).toEqual(expected);
      expect(authService.signUp).toHaveBeenCalledWith(dto);
    });
  });

  describe('signIn', () => {
    it('should call authService.signIn and return the result', async () => {
      const dto = { email: 'test@example.com', password: 'Password1' };
      const expected = { access_token: 'mock-jwt-token' };
      authService.signIn.mockResolvedValue(expected);

      const result = await controller.signIn(dto);

      expect(result).toEqual(expected);
      expect(authService.signIn).toHaveBeenCalledWith(dto.email, dto.password);
    });
  });

  describe('getProfile', () => {
    it('should return the user from the request', () => {
      const mockUser = { username: 'testuser', id: 'user-id-123' };
      const req = { user: mockUser } as any;

      const result = controller.getProfile(req);

      expect(result).toEqual(mockUser);
    });
  });
});
