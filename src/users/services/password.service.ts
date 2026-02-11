import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '@users/constants/password.constants';

@Injectable()
export class PasswordService {
  async encryptPassword(password: string): Promise<string> {
    try {
      const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
      return await bcrypt.hash(password, salt);
    } catch (e) {
      throw new InternalServerErrorException(
        'Échec du hashage du mot de passe',
      );
    }
  }

  async isValidPassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (e) {
      throw new InternalServerErrorException(
        'Échec de la vérification du mot de passe',
      );
    }
  }
}
