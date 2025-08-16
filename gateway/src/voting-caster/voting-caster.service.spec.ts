import { Test, TestingModule } from '@nestjs/testing';
import { VotingCasterService } from './voting-caster.service';

describe('VotingCasterService', () => {
  let service: VotingCasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotingCasterService],
    }).compile();

    service = module.get<VotingCasterService>(VotingCasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
