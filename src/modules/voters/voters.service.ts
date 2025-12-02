import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVoterDto } from './dto/create-voter.dto';
import { UpdateVoterDto } from './dto/update-voter.dto';
import { Voter } from './entities/voter.entity';
import * as bcrypt from 'bcrypt';
import { interfaceHandleResponse } from '../common/handleResponse.interface';
import { interfaceHandleError } from '../common/handleError.interface';
@Injectable()
export class VotersService {
  constructor(
    @InjectRepository(Voter)
    private voterRepository: Repository<Voter>,
  ) {}

  async create(
    createVoterDto: CreateVoterDto,
  ): Promise<interfaceHandleResponse | interfaceHandleError> {
    try {
      const existingVoter = await this.voterRepository.findOne({
        where: { email: createVoterDto.email },
      });

      if (existingVoter) {
        throw new ConflictException('The email address is already registered.');
      }

      const hashedPassword = await bcrypt.hash(createVoterDto.password, 10);

      const voter = this.voterRepository.create({
        ...createVoterDto,
        password: hashedPassword,
      });

      const newVoter = await this.voterRepository.save(voter);

      const { password, ...voterWithoutPassword } = newVoter;

      return {
        data: voterWithoutPassword,
        message: 'Voter created successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      return { error, message: 'Failed to create user' };
    }
  }

  async findAll(): Promise<interfaceHandleResponse | interfaceHandleError> {
    try {
      const findAllVoters = await this.voterRepository.find();
      if (findAllVoters.length === 0) {
        return {
          data: [],
          message: 'There are no registered voters.',
          statusCode: HttpStatus.OK,
        };
      }
      return {
        data: findAllVoters,
        message: 'Voters found successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return { error, message: 'Failed to find Voters' };
    }
  }

  async findOne(id: string,): Promise<interfaceHandleResponse | interfaceHandleError> {
    try {
    const voter = await this.voterRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'has_voted'],
    });

    if (!voter) {
      throw new NotFoundException(`Votante con ID ${id} no encontrado`);
    }

    return {
      data: voter,
      message: 'Voter found successfully',
      statusCode: HttpStatus.OK,
    };
  } catch (error) {
    if (error instanceof NotFoundException) throw error;
    return {
      error,
      message: 'Failed to fetch voter',
    };
  }
  }

  update(id: number, updateVoterDto: UpdateVoterDto) {
    return `This action updates a #${id} voter`;
  }

  remove(id: number) {
    return `This action removes a #${id} voter`;
  }
}
