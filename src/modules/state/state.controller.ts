import { Controller, Delete, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { Response } from "express";
import StateService from "./state.service";

@Controller('state')
export default class StateController {
    constructor(private stateService: StateService) { }
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

    @Get('search/:searchField')
    async search(@Param('searchField') searchField: string, @Res() res: Response) {

        const result = await this.stateService.searchByStateName(searchField);
        res.status(200).send({
            message: 'result of state search',
            data: result
        });
    }
}