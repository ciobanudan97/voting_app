import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { VotingCasterService } from './voting-caster.service';
import { VoteDto } from './dto/vote.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/authorization/JwtAuthGuard';
import { RolesGuard } from 'src/authorization/RolesGuards';
import { Role } from 'src/authorization/roles';
import { Roles } from 'src/authorization/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vote')
export class VotingCasterController {
  constructor(private readonly votingCasterService: VotingCasterService) { }

  @Post()
  @Roles(Role.User)
  vote(@Body() voteDto: VoteDto, @Request() req) {
    return this.votingCasterService.sendVote(voteDto, req.user.email);
  }


}
