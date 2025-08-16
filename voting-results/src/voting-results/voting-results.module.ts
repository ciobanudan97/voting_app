import { Module } from '@nestjs/common';
import { VotingResultsService } from './voting-results.service';
import { VotingResultsController } from './voting-results.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteSchema } from './entitties/vote.entity';

@Module({
  controllers: [VotingResultsController],
  providers: [VotingResultsService],
  imports: [
    MongooseModule.forFeature([{ name: 'VoteOption', schema: VoteSchema }])
  ],
})
export class VotingResultsModule { }
