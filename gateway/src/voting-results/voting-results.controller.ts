import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { VotingResultsService } from './voting-results.service';
import { JwtAuthGuard } from 'src/authorization/JwtAuthGuard';
import { RolesGuard } from 'src/authorization/RolesGuards';
import { Role } from 'src/authorization/roles';
import { Roles } from 'src/authorization/roles.decorator';

@Controller('voting-results')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VotingResultsController {
  constructor(private readonly votingResultsService: VotingResultsService) { }

  @Get('count/:category')
  @Roles(Role.Admin)
  countByCategory(@Param('category') category: string) {
    return this.votingResultsService.countVotesByCategory(category);
  }

  @Get(':category')
  @Roles(Role.Admin)
  findByCategory(@Param('category') category: string) {
    return this.votingResultsService.findByCategory(category);
  }

}
