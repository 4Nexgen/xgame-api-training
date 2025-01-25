import { Test, TestingModule } from '@nestjs/testing';
import { XgameController } from './xgame.controller';
import { XgameService } from './xgame.service';

describe('XgameController', () => {
  let controller: XgameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XgameController],
      providers: [XgameService],
    }).compile();

    controller = module.get<XgameController>(XgameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
