import { Body, Controller, Post } from '@nestjs/common';
import { AddCommentDto } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post('create')
    async create(@Body() body :AddCommentDto) {
        const result = await this.commentService.add(body);

        return {
            message: 'Comment Created.',
            data: result
        }
    }
}
