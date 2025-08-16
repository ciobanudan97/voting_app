import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VotingOptionsService } from './voting-options.service';
import { CreateVotingOptionDto } from './dto/create-voting-option.dto';
import { JwtAuthGuard } from '../authorization/JwtAuthGuard';
import { RolesGuard } from '../authorization/RolesGuards';
import { Roles } from '../authorization/roles.decorator';
import { Role } from 'src/authorization/roles';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('voting-options')
export class VotingOptionsController {
  constructor(private readonly votingOptionsService: VotingOptionsService) { }

  @Post()
  // @Roles(Role.Admin)
  create(@Body() createVotingOptionDto: CreateVotingOptionDto) {
    return this.votingOptionsService.create(createVotingOptionDto);
  }

  @Get()
  // @Roles(Role.Admin)
  findAll() {
    return this.votingOptionsService.findAll();
  }

  @Get(':category')
  // @Roles(Role.User, Role.Admin)
  findByCategory(@Param('category') category: string) {
    return this.votingOptionsService.findByCategory(category);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.votingOptionsService.remove(id);
  }
}
