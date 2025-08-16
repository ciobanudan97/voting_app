import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Strategy } from "passport-local";
import { LoginDto } from "./dto/login.dto";
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super()
    }

    async validate(loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto);
        if (!user) throw new UnauthorizedException();
        return user;
    }
}