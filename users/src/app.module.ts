import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'mysql',
      port: parseInt(process.env.DB_PORT || "3306"),
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || 'userpass',
      database: process.env.DB_NAME || 'usersdb',
      entities: [User],
      synchronize: true,
    })
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule { }
