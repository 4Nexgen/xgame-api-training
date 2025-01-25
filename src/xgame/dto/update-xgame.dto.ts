import { PartialType } from '@nestjs/mapped-types';
import { CreateXgameDto } from './create-xgame.dto';

export class UpdateXgameDto extends PartialType(CreateXgameDto) {}
