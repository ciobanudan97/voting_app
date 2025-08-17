import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VotingResultsModule } from './voting-results/voting-results.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [VotingResultsModule,
    MongooseModule.forRoot(`mongodb://${process.env.MONGODB_HOST || "mongodb"}:
      ${parseInt(process.env.MONGODB_PORT || "27017")}/
      ${process.env.MONGODB_DATABASE || "voting_db"}`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
