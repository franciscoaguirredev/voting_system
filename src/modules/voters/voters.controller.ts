import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { VotersService } from './voters.service';
import { CreateVoterDto } from './dto/create-voter.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiControllerDocs } from '../common/docs/decorators/api-controller-docs.decorator';
import { ApiCreateVoter, ApiFindAllVoters,ApiFindOneVoter, ApiDeleteVoter} from './docs'


@ApiControllerDocs('Voters')
@Controller('voters')
export class VotersController {
  constructor(private readonly votersService: VotersService) {}

  @Public()
  @ApiCreateVoter() 
  @Post()
  async create(@Body() createVoterDto: CreateVoterDto) {
    return await this.votersService.create(createVoterDto)
  }

  @ApiFindAllVoters()
  @Get()
  async findAll() {
    return await this.votersService.findAll();
  }

  @ApiFindOneVoter()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votersService.findOne(id);
  }

  @ApiDeleteVoter()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.votersService.remove(id);
  }
}
