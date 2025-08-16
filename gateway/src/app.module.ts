import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VotingOptionsModule } from './voting-options/voting-options.module';
import { VotingCasterModule } from './voting-caster/voting-caster.module';
import { AuthModule } from './auth/auth.module';
import { VotingResultsModule } from './voting-results/voting-results.module';

@Module({
  imports: [UsersModule, VotingOptionsModule, VotingCasterModule, AuthModule, VotingResultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
