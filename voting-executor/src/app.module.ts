import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VotingExecutorModule } from './voting-executor/voting-executor.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [VotingExecutorModule,
    MongooseModule.forRoot('mongodb://mongodb:27017/voting_db'), // 🔧 replace with your DB name
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
