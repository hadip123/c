import SeenService from './seen.service'
import { Controller } from '@nestjs/common'

@Controller()
export default class SeenController {
	constructor(private readonly seenService: SeenService) {}
}