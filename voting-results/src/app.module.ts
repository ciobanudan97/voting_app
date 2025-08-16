import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VotingResultsModule } from './voting-results/voting-results.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [VotingResultsModule,
    MongooseModule.forRoot('mongodb://mongodb:27017/voting_db'), // 🔧 replace with your DB name

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
