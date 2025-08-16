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
          host: 'voting-options',
          port: 4003
        }
      },
    ]),
  ]
})
export class VotingOptionsModule { }
