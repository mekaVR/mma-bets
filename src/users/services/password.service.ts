import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '@users/constants/password.constants';
import { ERROR_MESSAGES } from '../../constants/error-messages.constant';

@Injectable()
export class PasswordService {
  async encryptPassword(password: string): Promise<string> {
    try {
      const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
      return await bcrypt.hash(password, salt);
    } catch (e) {
      throw new InternalServerErrorException(ERROR_MESSAGES.FAILURE_HASHAGE);
    }
  }

  async isValidPassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (e) {
      throw new InternalServerErrorException(
        ERROR_MESSAGES.FAILURE_PASSWORD_VERIFICATION,
      );
    }
  }
}
