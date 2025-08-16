import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'users',
          port: 4001
        }
      },
    ]),
  ],
})
export class UsersModule { }
