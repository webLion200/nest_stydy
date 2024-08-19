import { Exclude } from 'class-transformer';
import { PostsEntity } from 'src/posts/posts.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100 })
  nickname: string;  //昵称

  @Column({ select: false })
  password: string;  // 密码

  @Column({default: null})
  avatar: string;   //头像

  @Column({default: null})
  email: string;

  @Column('enum', {enum: ['root', 'auth', 'visitor'], default: 'visitor'})
  role: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert() 
  async encryptPwd() { 
    this.password = await bcrypt.hashSync(this.password); 
  } 
}
