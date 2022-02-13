import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "../auth/authenticated.guard";
import { PostCreateDto, PostDeleteDto, PostUpdateDto } from "./post.dto";
import PostService from "./post.service";

@Controller('post')
export default class PostController {
    constructor(private postService: PostService) { }

    @UseGuards(AuthenticatedGuard)
    @Post('create')
    async create(@Body() body: PostCreateDto, @Request() req) {
        return {
            message: 'Post created',
            data: await this.postService.create({
                stateId: body.stateId,
                title: body.title,
                description: body.description,
                text: body.text,
                authorId: req.user["_doc"]["_id"],
            }, req)
        }
    }

    @Get('seen/:postId')
    async seen(@Param('postId') postId: string, @Request() req) {
        return {
            message: 'Seen added',
            data: await this.postService.seen({ postId }, req.ip)
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Post('update')
    async update(@Body() body: PostUpdateDto,
        @Request() req) {
        const result = await this.postService.update(body, req.user["_doc"]["_id"]);

        return {
            message: 'Post updated',
            data: result
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Post('delete')
    async delete(@Body() body: PostDeleteDto, @Request() req) {
        const result = await this.postService.delete(body.postId, req.user["_doc"]["_id"]);

        return {
            message: 'Post deleted.',
            data: result
        }
    }

    @Get('state/:id')
    async getPostsByState(
        @Param('id') stateId: string
    ) {
        const result = await this.postService.getByState(stateId);

        return {
            message: 'There are posts of this state.',
            data: result
        }
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        const result = await this.postService.getById(id);

        return {
            message: 'This is post info',
            data: result
        }
    }
}