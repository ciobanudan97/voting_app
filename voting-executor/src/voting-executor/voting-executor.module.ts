import { Module } from '@nestjs/common';
import { VotingExecutorService } from './voting-executor.service';
import { VotingExecutorController } from './voting-executor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteSchema } from './entities/vote.entity';
import { ElectorSchema } from './entities/elector.entity';

@Module({
  controllers: [VotingExecutorController],
  providers: [VotingExecutorService],
  imports: [
    MongooseModule.forFeature([
      { name: 'VoteOption', schema: VoteSchema },
      { name: 'Elector', schema: ElectorSchema }])
  ],
})
export class VotingExecutorModule { }
