import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '@users/services/users.service';
import { UserRole } from '@users/constants/user.constants';
import { AuthenticatedRequest } from '@auth/interfaces/authenticated-request.interface';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;

  const userId = 7;
  const mockRequest: AuthenticatedRequest = {
    user: { id: userId, username: 'testuser' },
  } as AuthenticatedRequest;

  const mockUser = {
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

  beforeEach(async () => {
    usersService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      updateUser: jest.fn(),
      updatePicture: jest.fn(),
      deleteUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      usersService.findAll.mockResolvedValue([mockUser]);

      const result = await controller.getAll();

      expect(result).toEqual([mockUser]);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return a single user by id', async () => {
      usersService.findOne.mockResolvedValue(mockUser);

      const result = await controller.getUser(userId);

      expect(result).toEqual(mockUser);
      expect(usersService.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('updateProfile', () => {
    it('should update and return the user', async () => {
      const updateDto = { username: 'updated', email: 'updated@example.com' };
      const updatedUser = { ...mockUser, ...updateDto };
      usersService.updateUser.mockResolvedValue(updatedUser);

      const result = await controller.updateProfile(mockRequest, updateDto);

      expect(result).toEqual(updatedUser);
      expect(usersService.updateUser).toHaveBeenCalledWith(userId, updateDto);
    });
  });

  describe('updatePicture', () => {
    it('should update user picture', async () => {
      const mockFile = { filename: 'avatar.jpg' } as Express.Multer.File;
      const updatedUser = {
        ...mockUser,
        picture: 'avatar.jpg',
      };
      usersService.updatePicture.mockResolvedValue(updatedUser);

      const result = await controller.updatePicture(mockRequest, mockFile);

      expect(result).toEqual(updatedUser);
      expect(usersService.updatePicture).toHaveBeenCalledWith(userId, mockFile);
    });
  });

  describe('deleteProfile', () => {
    it('should delete the user', async () => {
      usersService.deleteUser.mockResolvedValue(undefined);

      await controller.deleteProfile(mockRequest);

      expect(usersService.deleteUser).toHaveBeenCalledWith(userId);
    });
  });
});
