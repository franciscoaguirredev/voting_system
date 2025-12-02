import { Controller, Get, Post, Body, Param, } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.votesService.create(createVoteDto);
  }

  @Get()
  findAll() {
    return this.votesService.findAll();
  }

  @Get('statistics')
  getStatistics() {
    return this.votesService.getStatistics();
  }

  @Get('participation')
  async getParticipation() {
    return await this.votesService.countVotersWhoVoted();
  }

}
