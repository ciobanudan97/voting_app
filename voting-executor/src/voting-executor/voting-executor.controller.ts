import { Controller } from '@nestjs/common';
import { VotingExecutorService } from './voting-executor.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { VoteOptionDto } from './dto/vote-option.dto';

@Controller()
export class VotingExecutorController {
  constructor(private readonly votingExecutorService: VotingExecutorService) { }

  @EventPattern('vote.cast')
  async handleVote(@Payload() data: { voteDto: VoteOptionDto, email }) {
    return await this.votingExecutorService.createVote(data.voteDto, data.email)
  }
}
