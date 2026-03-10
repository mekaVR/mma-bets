import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '@users/services/users.service';
import {
  mockRankedUsers,
  mockRequest,
  mockUser,
} from '@users/__mocks__/users.mocks';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;

  beforeEach(async () => {
    usersService = {
      findAll: jest.fn(),
      getRanking: jest.fn(),
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

  describe('getRanking', () => {
    it('should return an array of user ordered by score', async () => {
      usersService.getRanking.mockResolvedValue(mockRankedUsers);

      const result = await controller.getRanking();

      expect(result).toEqual(mockRankedUsers);
      expect(usersService.getRanking).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return a single user by id', async () => {
      usersService.findOne.mockResolvedValue(mockUser);

      const result = await controller.getUser(mockUser.id);

      expect(result).toEqual(mockUser);
      expect(usersService.findOne).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('updateProfile', () => {
    it('should update and return the user', async () => {
      const updateDto = { username: 'updated', email: 'updated@example.com' };
      const updatedUser = { ...mockUser, ...updateDto };
      usersService.updateUser.mockResolvedValue(updatedUser);

      const result = await controller.updateProfile(mockRequest, updateDto);

      expect(result).toEqual(updatedUser);
      expect(usersService.updateUser).toHaveBeenCalledWith(
        mockUser.id,
        updateDto,
      );
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
      expect(usersService.updatePicture).toHaveBeenCalledWith(
        mockUser.id,
        mockFile,
      );
    });
  });

  describe('deleteProfile', () => {
    it('should delete the user', async () => {
      usersService.deleteUser.mockResolvedValue(undefined);

      await controller.deleteProfile(mockRequest);

      expect(usersService.deleteUser).toHaveBeenCalledWith(mockUser.id);
    });
  });
});
