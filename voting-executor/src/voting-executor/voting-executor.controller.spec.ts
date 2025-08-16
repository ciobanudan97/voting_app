import { Test, TestingModule } from '@nestjs/testing';
import { VotingExecutorController } from './voting-executor.controller';
import { VotingExecutorService } from './voting-executor.service';

describe('VotingExecutorController', () => {
  let controller: VotingExecutorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotingExecutorController],
      providers: [VotingExecutorService],
    }).compile();

    controller = module.get<VotingExecutorController>(VotingExecutorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
