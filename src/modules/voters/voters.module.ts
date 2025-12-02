import { Module } from '@nestjs/common';
import { VotersService } from './voters.service';
import { VotersController } from './voters.controller';
import { Voter } from './entities/voter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports:[
    TypeOrmModule.forFeature([Voter]),
  ],
  controllers: [VotersController],
  providers: [VotersService],
})
export class VotersModule {}
