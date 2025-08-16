import { Test, TestingModule } from '@nestjs/testing';
import { VotingResultsController } from './voting-results.controller';
import { VotingResultsService } from './voting-results.service';

describe('VotingResultsController', () => {
  let controller: VotingResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotingResultsController],
      providers: [VotingResultsService],
    }).compile();

    controller = module.get<VotingResultsController>(VotingResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
