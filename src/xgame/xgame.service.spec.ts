import { Test, TestingModule } from '@nestjs/testing';
import { XgameService } from './xgame.service';

describe('XgameService', () => {
  let service: XgameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XgameService],
    }).compile();

    service = module.get<XgameService>(XgameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
