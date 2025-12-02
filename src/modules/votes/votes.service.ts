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

      const formattedVotes = votes.map((vote) => ({
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
        },
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

  async getStatistics(): Promise<
    interfaceHandleResponse | interfaceHandleError
  > {
    try {
      // 1. Obtener total de votos
      const totalVotes = await this.voteRepository.count();

      // 2. Obtener candidatos y sus votos
      const candidates = await this.candidateRepository.find({
        relations: ['votes'],
      });

      // 3. Construir estadísticas por candidato
      const stats = candidates.map((candidate) => {
        const votesCount = candidate.votes.length;

        let percentage = 0;

        if (totalVotes > 0) {
          const result = (votesCount / totalVotes) * 100;
          percentage = Number(result.toFixed(2));
        }

        return {
          candidateId: candidate.id,
          candidateName: candidate.name,
          party: candidate.party,
          votes: votesCount, //Total votos por candidato
          percentage: percentage, //Porcentaje de votos por candidato
        };
      });

      return {
        data: {
          totalVotes: totalVotes,
          candidates: stats,
        },
        message: 'Statistics successfully created',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        error,
        message: 'Failed to create Statistics',
      };
    }
  }

  async countVotersWhoVoted(): Promise<
    interfaceHandleResponse | interfaceHandleError
  > {
    try {
      // 1. Contar votantes que han votado
      const votedCount = await this.voterRepository.count({
        where: { has_voted: true },
      });

      // 2. Contar total de votantes
      const totalVoters = await this.voterRepository.count();

      // 3. Calcular porcentaje de participación
      let percentage = 0;

      if (totalVoters > 0) {
        const result = (votedCount / totalVoters) * 100;
        percentage = Number(result.toFixed(2));
      }

      return {
        data: {
          totalVoters: totalVoters, //Total votantes registrados
          votersWhoVoted: votedCount, //Total de votantes que han votado
          participationPercentage: percentage, //Porcentaje de participación
        },
        message: 'Voter participation statistics retrieved successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        error,
        message: 'Failed to retrieve voter participation statistics',
      };
    }
  }
}
