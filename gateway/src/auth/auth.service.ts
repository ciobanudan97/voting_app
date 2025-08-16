import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_SERVICE') private readonly client: ClientProxy
    ) { }

    login(loginDto: LoginDto) {
        return firstValueFrom(this.client.send({ cmd: 'login' }, loginDto))
    }

    logOut() { }
}
