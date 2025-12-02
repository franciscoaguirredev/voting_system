import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Repository } from 'typeorm';
import { interfaceHandleResponse } from '../common/handleResponse.interface';
import { interfaceHandleError } from '../common/handleError.interface';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>
  ){}

  async create(
      createCandidateDto: CreateCandidateDto,
    ): Promise<interfaceHandleResponse | interfaceHandleError> {
      try {
        const existingCandidate = await this.candidateRepository.findOne({
          where: { name: createCandidateDto.name },
        });
  
        if (existingCandidate) {
          throw new ConflictException('The candidate is already registered.');
        }
  
        const newCandidate = await this.candidateRepository.save(createCandidateDto);
  
        return {
          data: newCandidate,
          message: 'Candidate created successfully',
          statusCode: HttpStatus.OK,
        };
      } catch (error) {
        if (error instanceof ConflictException) throw error;
        return { error, message: 'Failed to create candidate' };
      }
    }

  async findAll(): Promise<interfaceHandleResponse | interfaceHandleError> {
    try {
      const findAllCandidates = await this.candidateRepository.find();
      if (findAllCandidates.length === 0) {
        return {
          data: [],
          message: 'There are no registered candidates.',
          statusCode: HttpStatus.OK,
        };
      }
      return {
        data: findAllCandidates,
        message: 'Candidates found successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return { error, message: 'Failed to find candidates' };
    }
  }

  async findOne(
    id: string,
  ): Promise<interfaceHandleResponse | interfaceHandleError> {
    try {
      const candidate = await this.candidateRepository.findOne({
        where: { id },
      });

      if (!candidate) {
        throw new NotFoundException(`Candidate with ID ${id} no found`);
      }

      return {
        data: candidate,
        message: 'Candidate found successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      return {
        error,
        message: 'Failed to fetch candidate',
      };
    }
  }

  async remove(
    id: string,
  ): Promise<interfaceHandleResponse | interfaceHandleError> {
    try {
      const candidate = await this.candidateRepository.findOne({ where: { id } });
      if (!candidate) {
        throw new NotFoundException(`voter with Id ${id} not found`);
      }
      await this.candidateRepository.remove(candidate);
      return {
        data: null,
        message: 'Candidate deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      return { error, message: 'Failed to delete candidate'};
    }
  }
}
