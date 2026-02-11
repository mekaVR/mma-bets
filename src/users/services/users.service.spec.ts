import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { PasswordService } from './password.service';

describe('UsersService', () => {
  let service: UsersService;
  let passwordService: Partial<Record<keyof PasswordService, jest.Mock>>;
  let userModel: any;

  const mockUser = {
    _id: 'user-id-123',
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashed-password',
    picture: null,
    score: 0,
    rank: 0,
    badges: [],
    coinsBonus: 0,
    admin: false,
    __v: 0,
  };

  beforeEach(async () => {
    passwordService = {
      encryptPassword: jest.fn().mockResolvedValue('hashed-password'),
    };

    const saveMock = jest.fn().mockResolvedValue(mockUser);
    userModel = jest.fn().mockImplementation(() => ({
      ...mockUser,
      save: saveMock,
      toObject() {
        return { ...mockUser };
      },
    }));
    userModel.find = jest.fn();
    userModel.findById = jest.fn();
    userModel.findOne = jest.fn();
    userModel.findByIdAndUpdate = jest.fn();
    userModel.findByIdAndDelete = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PasswordService, useValue: passwordService },
        { provide: getModelToken('User'), useValue: userModel },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should encrypt password and create user', async () => {
      const dto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password1',
      };

      const result = await service.createUser(dto);

      expect(passwordService.encryptPassword).toHaveBeenCalledWith('Password1');
      expect(result.username).toBe('testuser');
      expect(result.email).toBe('test@example.com');
    });
  });

  describe('findAll', () => {
    it('should return an array of UserEntity', async () => {
      userModel.find.mockResolvedValue([
        { toObject: () => ({ ...mockUser }) },
        { toObject: () => ({ ...mockUser, username: 'user2' }) },
      ]);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(userModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single UserEntity by id', async () => {
      userModel.findById.mockResolvedValue({
        toObject: () => ({ ...mockUser }),
      });

      const result = await service.findOne('user-id-123');

      expect(result.username).toBe('testuser');
      expect(userModel.findById).toHaveBeenCalledWith('user-id-123');
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      userModel.findOne.mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(userModel.findOne).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
    });

    it('should return null if no user found', async () => {
      userModel.findOne.mockResolvedValue(null);

      const result = await service.findByEmail('unknown@example.com');

      expect(result).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('should update and return the updated UserEntity', async () => {
      const updateDto = { username: 'updated', email: 'updated@example.com' };
      userModel.findByIdAndUpdate.mockResolvedValue({
        toObject: () => ({ ...mockUser, ...updateDto }),
      });

      const result = await service.updateUser('user-id-123', updateDto);

      expect(result.username).toBe('updated');
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'user-id-123',
        updateDto,
        { new: true },
      );
    });
  });

  describe('updatePicture', () => {
    it('should update user picture and return updated UserEntity', async () => {
      userModel.findByIdAndUpdate.mockResolvedValue({
        toObject: () => ({ ...mockUser, picture: 'avatar.jpg' }),
      });

      const result = await service.updatePicture('user-id-123', {
        filename: 'avatar.jpg',
      });

      expect(result.picture).toBe('avatar.jpg');
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'user-id-123',
        { picture: 'avatar.jpg' },
        { new: true },
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete user by id', async () => {
      userModel.findByIdAndDelete.mockResolvedValue(mockUser);

      const result = await service.deleteUser('user-id-123');

      expect(result).toEqual(mockUser);
      expect(userModel.findByIdAndDelete).toHaveBeenCalledWith('user-id-123');
    });
  });
});
