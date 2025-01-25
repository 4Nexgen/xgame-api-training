import { Module } from '@nestjs/common';
import { XgameService } from './xgame.service';
import { XgameController } from './xgame.controller';

@Module({
  controllers: [XgameController],
  providers: [XgameService],
})
export class XgameModule {}
