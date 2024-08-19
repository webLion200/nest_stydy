import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @Get()
  findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
    return await this.userService.update(id, updateUser)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
