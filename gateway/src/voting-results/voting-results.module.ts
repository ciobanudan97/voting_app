import { Module } from '@nestjs/common';
import { VotingResultsService } from './voting-results.service';
import { VotingResultsController } from './voting-results.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [VotingResultsController],
  providers: [VotingResultsService],
  imports: [
    ClientsModule.register([
      {
        name: 'VOTING_RESULTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'voting-results',
          port: 4004
        }
      },
    ]),
  ]
})
export class VotingResultsModule { }
