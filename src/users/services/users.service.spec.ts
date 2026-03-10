import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PasswordService } from './password.service';
import { User } from '@users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mockRankedUsers, mockUser } from '@users/__mocks__/users.mocks';

describe('UsersService', () => {
  let service: UsersService;
  let passwordService: Partial<Record<keyof PasswordService, jest.Mock>>;
  let userRepository: Partial<Record<keyof Repository<User>, jest.Mock>>;

  beforeEach(async () => {
    passwordService = {
      encryptPassword: jest.fn().mockResolvedValue('hashed-password'),
    };

    userRepository = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PasswordService, useValue: passwordService },
        { provide: getRepositoryToken(User), useValue: userRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('should encrypt password and create user', async () => {
      const dto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password1',
      };

      userRepository.save.mockResolvedValue(mockUser);

      const result = await service.createUser(dto);

      expect(passwordService.encryptPassword).toHaveBeenCalledWith('Password1');
      expect(result.username).toBe('testuser');
      expect(result.email).toBe('test@example.com');
    });
  });

  describe('findAll', () => {
    it('should return an array of UserEntity', async () => {
      userRepository.find.mockResolvedValue([
        mockUser,
        { ...mockUser, username: 'user2' },
      ]);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe('getRanking', () => {
    it('should return an array of user ordered by score', async () => {
      userRepository.find.mockResolvedValue(mockRankedUsers);

      const result = await service.getRanking();

      expect(result).toEqual(mockRankedUsers);
      expect(userRepository.find).toHaveBeenCalledWith({
        select: ['id', 'username', 'score', 'picture'],
        order: { score: 'DESC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single UserEntity by id', async () => {
      userRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await service.findOne(mockUser.id);

      expect(result.username).toBe('testuser');
      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUser.id,
      });
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      userRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
    });

    it('should return null if no user found', async () => {
      userRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findByEmail('unknown@example.com');

      expect(result).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('should update and return the updated UserEntity', async () => {
      const updateDto = {
        username: 'updated',
        email: 'updated@example.com',
        firstName: 'Bob',
        lastName: 'Foo',
      };
      userRepository.update.mockResolvedValue(undefined);
      userRepository.findOneBy.mockResolvedValue({
        ...mockUser,
        ...updateDto,
      });

      const result = await service.updateUser(mockUser.id, updateDto);

      expect(result.username).toBe('updated');
      expect(userRepository.update).toHaveBeenCalledWith(
        mockUser.id,
        updateDto,
      );
    });
  });

  describe('updatePicture', () => {
    it('should update user picture and return updated UserEntity', async () => {
      userRepository.update.mockResolvedValue(undefined);
      userRepository.findOneBy.mockResolvedValue({
        ...mockUser,
        picture: 'avatar.jpg',
      });

      const result = await service.updatePicture(mockUser.id, {
        filename: 'avatar.jpg',
      });

      expect(result.picture).toBe('avatar.jpg');
      expect(userRepository.update).toHaveBeenCalledWith(mockUser.id, {
        picture: 'avatar.jpg',
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete user by id', async () => {
      userRepository.delete.mockResolvedValue(mockUser);

      const result = await service.deleteUser(mockUser.id);

      expect(result).toEqual(mockUser);
      expect(userRepository.delete).toHaveBeenCalledWith(mockUser.id);
    });
  });
});
