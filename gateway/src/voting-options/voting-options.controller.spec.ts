import { Test, TestingModule } from '@nestjs/testing';
import { VotingOptionsController } from './voting-options.controller';
import { VotingOptionsService } from './voting-options.service';

describe('VotingOptionsController', () => {
  let controller: VotingOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotingOptionsController],
      providers: [VotingOptionsService],
    }).compile();

    controller = module.get<VotingOptionsController>(VotingOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
