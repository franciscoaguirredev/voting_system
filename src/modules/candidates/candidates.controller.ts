import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { ApiControllerDocs } from '../common/docs/decorators/api-controller-docs.decorator';
import {ApiCreateCandidate, ApiFindOneCandidate, ApiFindAllCandidates, ApiDeleteCandidate } from './docs'


@ApiControllerDocs('Candidates')
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @ApiCreateCandidate()
  @Post()
  async create(@Body() createCandidateDto: CreateCandidateDto) {
    return await this.candidatesService.create(createCandidateDto);
  }

  @ApiFindAllCandidates()
  @Get()
  async findAll() {
    return await this.candidatesService.findAll();
  }

  @ApiFindOneCandidate()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.candidatesService.findOne(id);
  }

  @ApiDeleteCandidate()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.candidatesService.remove(id);
  }
}
