import { Test, TestingModule } from '@nestjs/testing';
import { VotingResultsService } from './voting-results.service';

describe('VotingResultsService', () => {
  let service: VotingResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotingResultsService],
    }).compile();

    service = module.get<VotingResultsService>(VotingResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
