import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface UserRo {
  list: UserEntity[];
  count: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(createUser: CreateUserDto) {
    const { username } = createUser;
    const exitUser = await this.userRepository.findOneBy({
      username,
    });
    if (exitUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository.create(createUser);
    return this.userRepository.save(newUser);
  }

  async findAll(query) {
    const qb = await this.userRepository.createQueryBuilder('user');
    qb.where('1 = 1');
    qb.orderBy('user.create_time', 'DESC');

    const count = qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const users = await qb.getMany();

    return { list: users, count };
  }

  async findById(id: number) {
    const user = await this.userRepository.findOneBy({
      id,
    });
    return user;
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existPost = await this.userRepository.findOneBy({ id });
    if (!existPost) {
      throw new HttpException('所查询的用户不存在', 401);
    }
    const user = this.userRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: number) {
    const existPost = await this.userRepository.findOneBy({ id });
    if (!existPost) {
      throw new HttpException('所查询的用户不存在', 401);
    }
    return this.userRepository.delete(id);
  }
}
