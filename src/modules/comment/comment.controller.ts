import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { AddCommentDto } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(AuthenticatedGuard)
    @Post('create')
    async create(@Body() body :AddCommentDto, @Request() req) {
        const author = req.user["_doc"]["name"] + ' ' + req.user["_doc"]["lastName"];
        const result = await this.commentService.add(body, author);

        return {
            message: 'Comment Created.',
            data: result
        }
    }

    @Get('post/:id')
    async get(@Param('id') postId: string) {
        const result = await this.commentService.getByPost(postId);

        return {
            message: 'Comments',
            data: result
        };
    }
}
