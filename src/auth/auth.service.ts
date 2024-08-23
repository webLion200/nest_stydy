import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(username: string, pass: string) {
    const exitUser = await this.userService.findOne(username);
    const passwordMatch = await bcrypt.compare(pass, exitUser?.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    return exitUser;
  }
}
