import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user);
  }

  async login(username: string, pass: string) {
    const exitUser = await this.userService.findOne(username);
    const passwordMatch = await bcrypt.compare(pass, exitUser?.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    const token = this.createToken({
      id: exitUser.id,
      username: exitUser.username,
      role: exitUser.role,
    });
    return token;
  }
}
