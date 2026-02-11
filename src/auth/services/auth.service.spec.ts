import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { UsersService } from '@users/services/users.service';
import { PasswordService } from '@users/services/password.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;
  let passwordService: Partial<Record<keyof PasswordService, jest.Mock>>;
  let userModel: Record<string, jest.Mock>;

  beforeEach(async () => {
    usersService = {
      createUser: jest.fn(),
      findByEmail: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('mock-jwt-token'),
    };

    passwordService = {
      isValidPassword: jest.fn(),
    };

    userModel = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
        { provide: PasswordService, useValue: passwordService },
        { provide: getModelToken('User'), useValue: userModel },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('generateJWT', () => {
    it('should return an access token', async () => {
      const result = await authService.generateJWT('testuser', 'user-id-123');

      expect(result).toEqual({ access_token: 'mock-jwt-token' });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        username: 'testuser',
        id: 'user-id-123',
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
      userModel.findOne.mockResolvedValue(null);
      usersService.createUser.mockResolvedValue({
        username: 'testuser',
        userId: 'user-id-123',
      });

      const result = await authService.signUp(createUserDto);

      expect(result).toEqual({ access_token: 'mock-jwt-token' });
      expect(userModel.findOne).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
      expect(userModel.findOne).toHaveBeenCalledWith({ username: 'testuser' });
      expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw ConflictException if email already exists', async () => {
      userModel.findOne.mockResolvedValueOnce({ email: 'test@example.com' });

      await expect(authService.signUp(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(usersService.createUser).not.toHaveBeenCalled();
    });

    it('should throw ConflictException if username already exists', async () => {
      userModel.findOne
        .mockResolvedValueOnce(null) // email check passes
        .mockResolvedValueOnce({ username: 'testuser' }); // username check fails

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
      usersService.findByEmail.mockResolvedValue({
        _id: { toString: () => 'user-id-123' },
        username: 'testuser',
        password: 'hashed-password',
      });
      passwordService.isValidPassword.mockResolvedValue(true);

      const result = await authService.signIn(email, password);

      expect(result).toEqual({ access_token: 'mock-jwt-token' });
      expect(usersService.findByEmail).toHaveBeenCalledWith(email);
      expect(passwordService.isValidPassword).toHaveBeenCalledWith(
        password,
        'hashed-password',
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
      usersService.findByEmail.mockResolvedValue({
        _id: { toString: () => 'user-id-123' },
        username: 'testuser',
        password: 'hashed-password',
      });
      passwordService.isValidPassword.mockResolvedValue(false);

      await expect(authService.signIn(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
