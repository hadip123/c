import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { AddCommentDto, CheckCommentDto, DeleteCommentDto, filterType } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(AuthenticatedGuard)
    @Post('create')
    async create(@Body() body :AddCommentDto, @Request() req) {
        const author = req.user['_doc']['_id'];
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

    @Get(':filterType')
    async getAll(@Param('filterType') filter: filterType) {
        const result = await this.commentService.all(filter);

        return {
            message: `There are all ${filter} comments`,
            data: result
        };
    }

    @UseGuards(AuthenticatedGuard)
    @Post('delete')
    async delete(@Body() body: DeleteCommentDto, @Request() req) {
        const result = await this.commentService.delete(body.id, req.user['_doc']['admin'])

        return {
            message: 'Comment Deleted',
            data: result
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Post('check')
    async checkPost(@Body() body: CheckCommentDto, @Request() req: any) {
        const result = await this.commentService.check(body.id, req.user['_doc']['admin']);

        return {
            message: 'Post checked',
            date: result,
        }
    }
}
