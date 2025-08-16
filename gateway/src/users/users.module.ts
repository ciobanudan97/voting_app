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
          host: process.env.USERS_SERVICE_HOST || 'users',
          port: parseInt(process.env.USERS_PORT || "4001") // Ensure the port is set from environment variable or default to 4001
        }
      },
    ]),
  ],
})
export class UsersModule { }
