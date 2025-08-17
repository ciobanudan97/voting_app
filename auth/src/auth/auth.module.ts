import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, LocalStrategy],
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USERS_SERVICE_HOST || "users",
          port: parseInt(process.env.USERS_PORT || "4001")
        },
      },
    ]),
    PassportModule,
    JwtModule.register({
      secretOrPrivateKey: 'secret-key',
      signOptions: { expiresIn: '1h' },
    }),

  ]
})
export class AuthModule { }
