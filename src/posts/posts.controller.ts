import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsService, PostsRo } from './posts.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dot';

@ApiTags("文章")
@Controller('post')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @ApiOperation({summary: '创建文章'})
    @Post()
    async create(@Body() post: CreatePostDto) {
        return await this.postsService.create(post)
    }

    @ApiOperation({summary: '获取文章列表'})
    @Get() 
    async findAll(@Query() query): Promise<PostsRo> {
        return await this.postsService.findAll(query)
    }

    @ApiOperation({summary: '查询文章'})
    @Get(':id')
    async findById(@Param('id') id) {
        return await this.postsService.findById(id)
    }

    @ApiOperation({summary: '更新文章'})
    @Put(":id")
    async update(@Param('id') id, @Body() post) {
        return await this.postsService.updateById(id, post)
    }

    @ApiOperation({summary: '删除文章'})
    @Delete(":id")
    async remove(@Param("id") id){
        return await this.postsService.remove(id)
    }
}
