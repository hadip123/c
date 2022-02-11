import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../schemas/post.schema';
import { State, StateSchema } from '../schemas/state.schema';
import StateController from './state.controller';
import StateService from './state.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: State.name, schema: StateSchema }, {name: Post.name, schema: PostSchema}])],
    controllers: [StateController],
    providers: [StateService],
})
export class StateModule { }
