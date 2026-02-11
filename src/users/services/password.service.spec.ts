import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(() => {
    service = new PasswordService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('encryptPassword', () => {
    it('should return a hashed password', async () => {
      const password = 'Password1';

      const hash = await service.encryptPassword(password);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(0);
    });

    it('should produce different hashes for the same password', async () => {
      const password = 'Password1';

      const hash1 = await service.encryptPassword(password);
      const hash2 = await service.encryptPassword(password);

      expect(hash1).not.toBe(hash2);
    });

    it('should throw InternalServerErrorException if bcrypt fails', async () => {
      (jest.spyOn(bcrypt, 'genSalt') as jest.Mock).mockRejectedValueOnce(
        new Error('fail'),
      );

      await expect(service.encryptPassword('Password1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('isValidPassword', () => {
    it('should return true for matching password and hash', async () => {
      const password = 'Password1';
      const hash = await service.encryptPassword(password);

      const result = await service.isValidPassword(password, hash);

      expect(result).toBe(true);
    });

    it('should return false for non-matching password', async () => {
      const hash = await service.encryptPassword('Password1');

      const result = await service.isValidPassword('WrongPassword1', hash);

      expect(result).toBe(false);
    });

    it('should throw InternalServerErrorException if bcrypt fails', async () => {
      (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockRejectedValueOnce(
        new Error('fail'),
      );

      await expect(service.isValidPassword('pwd', 'hash')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
