import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;
  let reflector: Partial<Record<keyof Reflector, jest.Mock>>;
  let configService: Partial<Record<keyof ConfigService, jest.Mock>>;

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn(),
    };

    reflector = {
      getAllAndOverride: jest.fn(),
    };

    configService = {
      get: jest.fn().mockReturnValue('test-jwt-secret'),
    };

    guard = new AuthGuard(
      jwtService as any,
      reflector as any,
      configService as any,
    );
  });

  function createMockContext(authHeader?: string): ExecutionContext {
    const request = {
      headers: {
        authorization: authHeader,
      },
    };

    return {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;
  }

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access to public routes', async () => {
    reflector.getAllAndOverride.mockReturnValue(true);
    const context = createMockContext();

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    reflector.getAllAndOverride.mockReturnValue(false);
    const context = createMockContext();

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if authorization header is not Bearer', async () => {
    reflector.getAllAndOverride.mockReturnValue(false);
    const context = createMockContext('Basic some-token');

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if token verification fails', async () => {
    reflector.getAllAndOverride.mockReturnValue(false);
    jwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'));
    const context = createMockContext('Bearer invalid-token');

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should set user on request and return true for valid token', async () => {
    const payload = { username: 'testuser', id: 'user-id-123' };
    reflector.getAllAndOverride.mockReturnValue(false);
    jwtService.verifyAsync.mockResolvedValue(payload);
    const context = createMockContext('Bearer valid-token');

    const result = await guard.canActivate(context);
    const request = context.switchToHttp().getRequest();

    expect(result).toBe(true);
    expect(request['user']).toEqual(payload);
    expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid-token', {
      secret: 'test-jwt-secret',
    });
  });
});
