import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, password: user.password };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const exitUser = await this.userService.findOne(username);
    const passwordMatch = await bcrypt.compare(pass, exitUser?.password);
    if (passwordMatch) {
      const { password, ...result } = exitUser;
      return result;
    }
    return null;
  }
}
