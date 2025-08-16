import { Test, TestingModule } from '@nestjs/testing';
import { VotingExecutorService } from './voting-executor.service';

describe('VotingExecutorService', () => {
  let service: VotingExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotingExecutorService],
    }).compile();

    service = module.get<VotingExecutorService>(VotingExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
