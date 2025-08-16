import { Controller } from '@nestjs/common';
import { VotingResultsService } from './voting-results.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('voting-results')
export class VotingResultsController {
  constructor(private readonly votingResultsService: VotingResultsService) { }

  @MessagePattern({ cmd: 'countVotesByCategory' })
  countVotesByCategory(@Payload() category: string) {
    return this.votingResultsService.countVotesByCategory(category);
  }

  @MessagePattern({ cmd: 'findByCategory' })
  findByCategory(@Payload() category: string) {
    return this.votingResultsService.findByCategory(category);
  }
}
