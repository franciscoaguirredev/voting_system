import { Controller, Get, Post, Body, Param, } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { ApiControllerDocs } from '../common/docs/decorators/api-controller-docs.decorator';
import { ApiCreateVoteDocs, ApiFindAllVotesDocs, ApiGetParticipationDocs, ApiGetStatisticsDocs } from './docs';

@ApiControllerDocs('Votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @ApiCreateVoteDocs()
  @Post()
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.votesService.create(createVoteDto);
  }

  @ApiFindAllVotesDocs()
  @Get()
  findAll() {
    return this.votesService.findAll();
  }

  @ApiGetStatisticsDocs()
  @Get('statistics')
  getStatistics() {
    return this.votesService.getStatistics();
  }

  @ApiGetParticipationDocs()
  @Get('participation')
  async getParticipation() {
    return await this.votesService.countVotersWhoVoted();
  }

}
