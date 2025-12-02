import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Voter } from '../voters/entities/voter.entity';
import { Vote } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { Candidate } from '../candidates/entities/candidate.entity';
import { interfaceHandleResponse } from '../common/handleResponse.interface';
import { interfaceHandleError } from '../common/handleError.interface';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
    @InjectRepository(Voter)
    private readonly voterRepository: Repository<Voter>,
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
  ) {}

  async create(
    createVoteDto: CreateVoteDto,
  ): Promise<interfaceHandleResponse | interfaceHandleError> {
    try {
      await this.findVoter(createVoteDto.voter_id);

      if (await this.hasVoted(createVoteDto.voter_id)) {
        throw new ConflictException('This voter has already cast their vote.');
      }

      await this.findCandidate(createVoteDto.candidate_id);

      const vote = this.voteRepository.create(createVoteDto);
      const newVote = await this.voteRepository.save(vote);

      await this.updateHasVoted(createVoteDto.voter_id);

      const voteCount = await this.getResultVotesByCandidate(
        createVoteDto.candidate_id,
      );

      await this.updateCandidateVoteCount(
        voteCount,
        createVoteDto.candidate_id,
      );

      return {
        data: {
          id: newVote.id,
          voter_id: newVote.voter_id,
          candidate_id: newVote.candidate_id,
        },
        message: 'Vote successfully registered',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      return {
        error,
        message: 'Failed to register vote',
      };
    }
  }

  async updateHasVoted(voterId: string): Promise<void> {
    await this.voterRepository.update(voterId, { has_voted: true });
  }

  async hasVoted(voterId: string): Promise<boolean> {
    const voter = await this.voterRepository.findOne({
      where: { id: voterId },
      select: ['id', 'has_voted'],
    });

    if (!voter) {
      throw new NotFoundException(`Voter with ID ${voterId} not found`);
    }

    return voter.has_voted;
  }

  async findVoter(voterId: string): Promise<boolean> {
    const voter = await this.voterRepository.findOne({
      where: { id: voterId },
    });

    if (!voter) {
      throw new NotFoundException(`Voter with ID ${voterId} not found`);
    }
    return true;
  }

  async findCandidate(candidateId: string): Promise<boolean> {
    const candidate = await this.candidateRepository.findOne({
      where: { id: candidateId },
    });

    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${candidateId} not found`);
    }
    return true;
  }

  async getResultVotesByCandidate(candidateId: string): Promise<number> {
    const voteCount = await this.voteRepository
      .createQueryBuilder('votes')
      .where('votes.candidate_id = :candidateId', { candidateId }) // ← Espacio agregado
      .getCount();

    return voteCount;
  }

  async updateCandidateVoteCount(
    voteCount: number,
    candidateId: string,
  ): Promise<boolean> {
    try {
      const candidate = await this.candidateRepository.findOne({
        where: { id: candidateId },
      });

      if (!candidate) {
        throw new NotFoundException(
          `Candidate 
          with ID ${candidateId} no found`,
        );
      }
      const votes = { votes: voteCount };

      Object.assign(candidate, votes);

      await this.candidateRepository.save(candidate);

      return true;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      return false;
    }
  }


async findAll(): Promise<interfaceHandleResponse | interfaceHandleError> {
  try {
    const votes = await this.voteRepository.find({
      relations: ['voter', 'candidate'],
      
    });

    if (votes.length === 0) {
      return {
        data: [],
        message: 'No votes have been cast yet',
        statusCode: HttpStatus.OK,
      };
    }

    const formattedVotes = votes.map(vote => ({
      id: vote.id,
      voter: {
        id: vote.voter.id,
        name: vote.voter.name,
        email: vote.voter.email,
      },
      candidate: {
        id: vote.candidate.id,
        name: vote.candidate.name,
        party: vote.candidate.party,
      }
    }));

    return {
      data: formattedVotes,
      message: 'Votes retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  } catch (error) {
    return {
      error,
      message: 'Failed to retrieve votes',
    };
  }
}
}
