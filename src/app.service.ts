import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AppService {
  async testAuth  () {
    return 'Hello';
  }
}
