import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { VotersService } from './voters.service';
import { CreateVoterDto } from './dto/create-voter.dto';
import { UpdateVoterDto } from './dto/update-voter.dto';

@Controller('voters')
export class VotersController {
  constructor(private readonly votersService: VotersService) {}

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVoterDto: UpdateVoterDto) {
    return await this.votersService.update(id, updateVoterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.votersService.remove(id);
  }
}
