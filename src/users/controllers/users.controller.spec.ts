import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '@users/services/users.service';
import { UserEntity } from '@users/entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;

  const mockUserEntity = new UserEntity({
    _id: 'user-id-123',
    username: 'testuser',
    email: 'test@example.com',
    picture: null,
    score: 0,
    rank: 0,
    badges: [],
    coinsBonus: 0,
  });

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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      usersService.findAll.mockResolvedValue([mockUserEntity]);

      const result = await controller.getAll();

      expect(result).toEqual([mockUserEntity]);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return a single user by id', async () => {
      usersService.findOne.mockResolvedValue(mockUserEntity);

      const result = await controller.getUser('user-id-123');

      expect(result).toEqual(mockUserEntity);
      expect(usersService.findOne).toHaveBeenCalledWith('user-id-123');
    });
  });

  describe('updateProfile', () => {
    it('should update and return the user', async () => {
      const updateDto = { username: 'updated', email: 'updated@example.com' };
      const updatedUser = new UserEntity({ ...mockUserEntity, ...updateDto });
      usersService.updateUser.mockResolvedValue(updatedUser);

      const result = await controller.updateProfile('user-id-123', updateDto);

      expect(result).toEqual(updatedUser);
      expect(usersService.updateUser).toHaveBeenCalledWith(
        'user-id-123',
        updateDto,
      );
    });
  });

  describe('updatePicture', () => {
    it('should update user picture', async () => {
      const mockFile = { filename: 'avatar.jpg' } as Express.Multer.File;
      const updatedUser = new UserEntity({
        ...mockUserEntity,
        picture: 'avatar.jpg',
      });
      usersService.updatePicture.mockResolvedValue(updatedUser);

      const result = await controller.updatePicture('user-id-123', mockFile);

      expect(result).toEqual(updatedUser);
      expect(usersService.updatePicture).toHaveBeenCalledWith(
        'user-id-123',
        mockFile,
      );
    });
  });

  describe('deleteProfile', () => {
    it('should delete the user', async () => {
      usersService.deleteUser.mockResolvedValue(undefined);

      await controller.deleteProfile('user-id-123');

      expect(usersService.deleteUser).toHaveBeenCalledWith('user-id-123');
    });
  });
});
