import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({message: '缺少用户名'})
  readonly username: string;

  @IsNotEmpty({message: '缺少昵称'})
  nickname: string

  @IsNotEmpty({message: '密码不能为空'})
  readonly password: string
}
