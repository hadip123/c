import { Controller, Get, Request, Post, Body, Param } from "@nestjs/common";
import { RatePostDto } from "./rate.dto";
import { RateService } from "./rate.service";

@Controller('rate')
export class RateController {
    constructor(private readonly rateService: RateService) {}

    @Get(':postId')
    async getByIP(@Request() req, @Param('postId') postId: string) {
        const result = await this.rateService.getByIP(req.ip, postId);

        return {
            message: 'Rate added',
            data: result
        }
    }

    @Post()
    async rate(@Request() req, @Body() body: RatePostDto) {
        const result = await this.rateService.create(body.rate, req.ip, body.postId);
        return {
            message: 'Post rated.',
            data: result
        }
    }

}