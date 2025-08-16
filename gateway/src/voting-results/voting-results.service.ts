import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VotingResultsService {
    constructor(
        @Inject('VOTING_RESULTS_SERVICE') private readonly client: ClientProxy
    ) { }
    countVotesByCategory(category: string) {
        return firstValueFrom(this.client.send({ cmd: 'countVotesByCategory' }, category));
    }

    findByCategory(category: string) {
        return firstValueFrom(this.client.send({ cmd: 'findByCategory' }, category));
    }
}
