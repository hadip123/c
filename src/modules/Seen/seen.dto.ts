import { IsMongoId } from '@nestjs/class-validator';

export class SeenPsotDto {
	@IsMongoId()
	postId: string;
}