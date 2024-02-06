import { Controller, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('公共接口')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Put('list/user')
  updateUser() {
    return { userId: 1 };
  }

  @Put('list/:id')
  update() {
    return "update";
  }

  
}
