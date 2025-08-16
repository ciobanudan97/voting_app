import { Module } from '@nestjs/common';
import { VotingOptionsService } from './voting-options.service';
import { VotingOptionsController } from './voting-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotingOption } from './entities/voting-option.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [VotingOptionsController],
  providers: [VotingOptionsService],
  imports: [
    TypeOrmModule.forFeature([VotingOption]),
    CacheModule.register()],

})
export class VotingOptionsModule { }
