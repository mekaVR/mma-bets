import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from '@auth/services/auth.service';
import { Public } from '@auth/decorators/public.decorator';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { AUTH_PATH } from '@auth/constants/path.constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post(AUTH_PATH.REGISTER)
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post(AUTH_PATH.LOGIN)
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @Get(AUTH_PATH.PROFILE)
  getProfile(@Request() req) {
    return req.user;
  }
}
