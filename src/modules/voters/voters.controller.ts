import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { VotersService } from './voters.service';
import { CreateVoterDto } from './dto/create-voter.dto';
import { Public } from 'src/auth/decorators/public.decorator';
@Controller('voters')
export class VotersController {
  constructor(private readonly votersService: VotersService) {}

  @Public() 
  @Post()
  async create(@Body() createVoterDto: CreateVoterDto) {
    return await this.votersService.create(createVoterDto)
  }

  @Get()
  async findAll() {
    return await this.votersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.votersService.remove(id);
  }
}
