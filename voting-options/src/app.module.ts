import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VotingOptionsModule } from './voting-options/voting-options.module';
import { VotingOption } from './voting-options/entities/voting-option.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [VotingOptionsModule,
    TypeOrmModule.forFeature([VotingOption]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'mysql',
      port: 3306,
      username: 'user',
      password: 'userpass',
      database: 'usersdb',
      entities: [VotingOption],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
