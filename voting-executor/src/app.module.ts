import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VotingExecutorModule } from './voting-executor/voting-executor.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [VotingExecutorModule,
    MongooseModule.forRoot(`mongodb://${process.env.MONGODB_HOST || "mongodb"}:
      ${parseInt(process.env.MONGODB_PORT || "27017")}/
      ${process.env.MONGODB_DATABASE || "voting_db"}`), // 🔧 replace with your DB name
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
