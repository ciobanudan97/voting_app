import { Inject, Injectable } from '@nestjs/common';
import { CreateVotingOptionDto } from './dto/create-voting-option.dto';
import { Repository } from 'typeorm';
import { VotingOption } from './entities/voting-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';


const TTL = 24 * 60 * 60 * 1000;

@Injectable()
export class VotingOptionsService {
  constructor(
    @InjectRepository(VotingOption)
    private readonly voteOptionRepository: Repository<VotingOption>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
  }

  async create(createVotingOptionDto: CreateVotingOptionDto) {
    const voteOption = await this.voteOptionRepository.create(createVotingOptionDto);

    return this.voteOptionRepository.save(voteOption);
  }

  findAll() {
    return this.voteOptionRepository.find();
  }

  async findByCategory(category: string) {

    const cachedOptions = await this.cacheManager.get(category);
    if (cachedOptions)
      return cachedOptions;

    const options = await this.voteOptionRepository.findOneBy({ category });

    await this.cacheManager.set(category, options, TTL);
    return options;
  }


  remove(id: string) {
    return this.voteOptionRepository.softDelete(id);
  }
}
