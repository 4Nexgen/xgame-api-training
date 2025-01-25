import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { XgameService } from './xgame.service';
import { CreateXgameDto } from './dto/create-xgame.dto';
import { UpdateXgameDto } from './dto/update-xgame.dto';

@Controller('xgame')
export class XgameController {
  constructor(private readonly xgameService: XgameService) {}

  @Post()
  create(@Body() createXgameDto: CreateXgameDto) {
    return this.xgameService.create(createXgameDto);
  }

  @Get()
  async findAll() {
    return await this.xgameService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.xgameService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateXgameDto: UpdateXgameDto) {
    return await this.xgameService.update(+id, updateXgameDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.xgameService.remove(+id);
  }
}
