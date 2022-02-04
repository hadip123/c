import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport'
import {Strategy} from 'passport-local';
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService) {
        super(); //Config
    }

    async validate(username: string, password: string) {
        
    }
}