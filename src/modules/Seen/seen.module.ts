import { Module } from '@nestjs/common';
import SeenController from './seen.controller'
import SeenService from './seen.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forFeature([
		// { name:  }
	])],
	controllers: [SeenController],
	providers: [SeenService]
})
export class SeenModule {}