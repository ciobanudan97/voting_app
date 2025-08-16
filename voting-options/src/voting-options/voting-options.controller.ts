import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VotingOptionsService } from './voting-options.service';
import { CreateVotingOptionDto } from './dto/create-voting-option.dto';
import { UpdateVotingOptionDto } from './dto/update-voting-option.dto';

@Controller()
export class VotingOptionsController {
  constructor(private readonly votingOptionsService: VotingOptionsService) { }

  @MessagePattern({ cmd: 'createVoteOptions' })
  create(@Payload() createVotingOptionDto: CreateVotingOptionDto) {
    return this.votingOptionsService.create(createVotingOptionDto);
  }

  @MessagePattern({ cmd: 'findAllVoteOptions' })
  findAll() {
    return this.votingOptionsService.findAll();
  }

  @MessagePattern({ cmd: 'findByCategory' })
  findByCategory(@Payload() category: string) {
    return this.votingOptionsService.findByCategory(category);
  }

  @MessagePattern({ cmd: 'removeVoteOption' })
  remove(@Payload() id: string) {
    return this.votingOptionsService.remove(id);
  }
}
