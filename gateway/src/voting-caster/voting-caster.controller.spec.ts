import { Test, TestingModule } from '@nestjs/testing';
import { VotingCasterController } from './voting-caster.controller';
import { VotingCasterService } from './voting-caster.service';

describe('VotingCasterController', () => {
  let controller: VotingCasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotingCasterController],
      providers: [VotingCasterService],
    }).compile();

    controller = module.get<VotingCasterController>(VotingCasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
