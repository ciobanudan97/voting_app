import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { VoteDto } from './dto/vote.dto';

@Injectable()
export class VotingCasterService {
    constructor(@Inject('VOTE_SERVICE') private client: ClientProxy) { }

    async sendVote(voteDto: VoteDto, email: string) {
        await this.client.emit('vote.cast', { voteDto, email });
    }
}
