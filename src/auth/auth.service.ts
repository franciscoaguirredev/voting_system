import { ConflictException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { loginVoterDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Voter } from 'src/modules/voters/entities/voter.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Voter) private readonly voterRepository: Repository<Voter>,
    private readonly jwtService: JwtService,

  ) {}

  async login(loginUserDto: loginVoterDto) {
    const { password, email } = loginUserDto;

    const voter = await this.voterRepository.findOne({
      where: { email },
      select: { email: true, password: true, name: true, id: true },
    });

    if (!voter || !bcrypt.compareSync(password, voter.password))
      throw new UnauthorizedException('Credentials are not valid (email or password)');

    const { password: _, ...dataUser } = voter;

    const payload = {
      name: voter.name,
      email: voter.email,
      id: voter.id,
    };

    return {
      ...dataUser,
      token: this.getJwtToken(payload),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload, {
    expiresIn: '24h',
  })
    return token;
  }

  validateToken(token: string): any {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (err) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}