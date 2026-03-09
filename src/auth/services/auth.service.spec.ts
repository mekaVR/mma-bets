import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '@users/services/users.service';
import { PasswordService } from '@users/services/password.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;
  let passwordService: Partial<Record<keyof PasswordService, jest.Mock>>;

  const userId = 7;
  const mockUser = {
    id: userId,
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashed-password',
  };

  beforeEach(async () => {
    usersService = {
      createUser: jest.fn(),
      findByEmail: jest.fn(),
      findByUsername: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('mock-jwt-token'),
    };

    passwordService = {
      isValidPassword: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
        { provide: PasswordService, useValue: passwordService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('generateJWT', () => {
    it('should return an access token', async () => {
      const result = await authService.generateJWT('testuser', userId);

      expect(result).toEqual({ access_token: 'mock-jwt-token' });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        username: 'testuser',
        id: userId,
      });
    });
  });

  describe('signUp', () => {
    const createUserDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password1',
    };

    it('should create a user and return a JWT token', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.findByUsername.mockResolvedValue(null);
      usersService.createUser.mockResolvedValue(mockUser);

      const result = await authService.signUp(createUserDto);

      expect(result).toEqual({ access_token: 'mock-jwt-token' });
      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(usersService.findByUsername).toHaveBeenCalledWith('testuser');
      expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw ConflictException if email already exists', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);

      await expect(authService.signUp(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(usersService.createUser).not.toHaveBeenCalled();
    });

    it('should throw ConflictException if username already exists', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.findByUsername.mockResolvedValue(mockUser);

      await expect(authService.signUp(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(usersService.createUser).not.toHaveBeenCalled();
    });
  });

  describe('signIn', () => {
    const email = 'test@example.com';
    const password = 'Password1';

    it('should return a JWT token on successful sign in', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);
      passwordService.isValidPassword.mockResolvedValue(true);

      const result = await authService.signIn(email, password);

      expect(result).toEqual({ access_token: 'mock-jwt-token' });
      expect(usersService.findByEmail).toHaveBeenCalledWith(email);
      expect(passwordService.isValidPassword).toHaveBeenCalledWith(
        password,
        mockUser.password,
      );
    });

    it('should throw UnauthorizedException if user not found', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(authService.signIn(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(passwordService.isValidPassword).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);
      passwordService.isValidPassword.mockResolvedValue(false);

      await expect(authService.signIn(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
