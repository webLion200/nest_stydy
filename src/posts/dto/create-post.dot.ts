import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// dto/create-post.dot.ts
export class CreatePostDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({message: '文章标题必填'})
  readonly title: string;

  @IsNotEmpty({ message: '缺少作者信息' })
  @ApiProperty({ description: '作者' })
  readonly author: string;

  @ApiPropertyOptional({ description: '内容' })
  readonly content: string;

  @ApiPropertyOptional({ description: '文章封面' })
  readonly cover_url: string;

  @IsNumber({allowNaN: true}, { message: '文章类型必须是数字' })
  @ApiProperty({ description: '文章类型' })
  readonly type: number;
}
