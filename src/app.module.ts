import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotersModule } from './modules/voters/voters.module';
import { Voter } from './modules/voters/entities/voter.entity';
import { Candidate } from './modules/candidates/entities/candidate.entity';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { VotesModule } from './modules/votes/votes.module';
import { AuthModule } from './auth/auth.module';
import { Vote } from './modules/votes/entities/vote.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        //dropSchema:true,
        entities: [Voter, Candidate, Vote],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    VotersModule,
    CandidatesModule,
    VotesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}