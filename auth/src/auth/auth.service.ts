import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private readonly client: ClientProxy,
        private jwtService: JwtService,
    ) { }

    async validateUser(loginDto: LoginDto) {
        const user = await firstValueFrom(
            this.client.send({ cmd: 'findOneUser' }, loginDto.email),
        );
        if (user) {
            const isMatch = await bcrypt.compare(loginDto.passwd, user.passwd);
            if (isMatch) return user;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const isUserValid = await this.validateUser(loginDto);
        if (!isUserValid)
            return { message: "user or passwd incorrect" }
        const payload = { email: loginDto.email, role: isUserValid.role };

        return {
            access_token: this.jwtService.sign(payload, { secret: "test" }),
        };
    }
}
