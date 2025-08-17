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
      port: parseInt(process.env.DB_PORT || "3306"),
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || 'userpass',
      database: process.env.MYSQL_DATABASE || 'usersdb',
      entities: [VotingOption],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
