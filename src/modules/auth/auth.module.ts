import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { SessionSerializer } from "./session.serializer";

@Module({
    providers: [AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModule {

}