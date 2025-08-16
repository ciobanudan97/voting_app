import { Inject, Injectable } from '@nestjs/common';
import { CreateVotingOptionDto } from './dto/create-voting-option.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VotingOptionsService {
  constructor(
    @Inject('VOTING_OPTIONS_SERVICE') private readonly client: ClientProxy
  ) { }

  create(createVotingOptionDto: CreateVotingOptionDto) {
    return firstValueFrom(this.client.send({ cmd: 'createVoteOptions' }, createVotingOptionDto));
  }

  findAll() {
    return firstValueFrom(this.client.send({ cmd: 'findAllVoteOptions' }, ''));
  }

  findByCategory(category: string) {
    return firstValueFrom(this.client.send({ cmd: 'findByCategory' }, category));
  }

  remove(id: string) {
    return firstValueFrom(this.client.send({ cmd: 'removeVoteOption' }, id));
  }
}
