import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '@users/constants/password.constants';

@Injectable()
export class PasswordService {
  async encryptPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      return await bcrypt.hash(password, salt);
    } catch (e) {
      console.log('ERROR:[ENCRYPT_PASSWORD]', e);
    }
  }

  async isValidPassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (e) {
      console.log('ERROR:[IS_VALID_PASSWORD]', e);
    }
  }
}
