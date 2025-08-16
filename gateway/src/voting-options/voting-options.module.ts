import { Module } from '@nestjs/common';
import { VotingOptionsService } from './voting-options.service';
import { VotingOptionsController } from './voting-options.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [VotingOptionsController],
  providers: [VotingOptionsService],
  imports: [
    ClientsModule.register([
      {
        name: 'VOTING_OPTIONS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.VOTING_OPTIONS_SERVICE_HOST || 'voting-options',
          port: parseInt(process.env.VOTING_OPTIONS_PORT || "4003") // Ensure the port is set from environment variable or default to 4003
        }
      },
    ]),
  ]
})
export class VotingOptionsModule { }
