import { Controller, Delete, Get, Param } from "@nestjs/common";
import StateService from "./state.service";

@Controller('state')
export default class StateController {
    constructor(private stateService: StateService) {}
    @Get('test')
    test() {
        return 'Test is ok'
    }

    @Get('create/:name')
    create(@Param('name') name: string) {
        return this.stateService.create(name);
    }

    @Get('get')
    async getALl() {
        return {
            message: 'There all states.',
            data: (await this.stateService.find())
        }
    }

    @Get(':id')
    async getStateName(@Param('id') id: string) {
        return {
            message: 'State name ',
            data: (await this.stateService.getStateName(id)).name
        }
    }
}