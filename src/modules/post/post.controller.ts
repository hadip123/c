import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PostCreateDto, PostDeleteDto, PostUpdateDto } from "./post.dto";
import PostService from "./post.service";

@Controller('post')
export default class PostController {
    constructor(private postService: PostService) {}

    @Post('create')
    async create(@Body() body: PostCreateDto) {
        return {
            message: 'Post created',
            data: await this.postService.create(body)
        }
    }

    @Get('seen/:postId')
    async seen(@Param('postId') postId: string) {
        return {
            message: 'Seen added',
            data: await this.postService.seen({postId})
        }
    }

    @Post('update')
    async update(@Body() body: PostUpdateDto) {
        const result = await this.postService.update(body);

        return {
            message: 'Post updated',
            data: result
        }
    }

    @Post('delete')
    async delete(@Body() body: PostDeleteDto) {
        const result = await this.delete(body);

        return {
            message: 'Post deleted.',

            data: result
        }
    }
}