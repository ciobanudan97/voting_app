import { Module } from '@nestjs/common';
import { VotingResultsService } from './voting-results.service';
import { VotingResultsController } from './voting-results.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { parse } from 'path';

@Module({
  controllers: [VotingResultsController],
  providers: [VotingResultsService],
  imports: [
    ClientsModule.register([
      {
        name: 'VOTING_RESULTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.VOTING_RESULTS_SERVICE_HOST || 'voting-results',
          port: parseInt(process.env.VOTING_RESULTS_PORT || "4004") // Ensure the port is set from environment variable or default to 4004
        }
      },
    ]),
  ]
})
export class VotingResultsModule { }
