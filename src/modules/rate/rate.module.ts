import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Rate, RateSchema } from '../schemas/rate.schema';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';

@Module({
    controllers: [RateController],
    providers:  [RateService],
    imports: [MongooseModule.forFeature([{name: Rate.name, schema: RateSchema}])]
})
export class RateModule {}