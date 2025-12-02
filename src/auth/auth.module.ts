import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Voter } from 'src/modules/voters/entities/voter.entity';
import { VotersService } from 'src/modules/voters/voters.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Voter]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {expiresIn: '2h'},
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, VotersService, JwtStrategy, JwtAuthGuard],
  exports: [
    TypeOrmModule,
    JwtStrategy,
    PassportModule,
    JwtModule,
    JwtAuthGuard,
  ],
})
export class AuthModule {}