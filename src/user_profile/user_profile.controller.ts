import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserProfileService } from './user_profile.service';
import { CreateUserProfileDto } from './dto/create-user_profile.dto';
import { UpdateUserProfileDto } from './dto/update-user_profile.dto';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  create(@Body() createUserProfileDto: CreateUserProfileDto) {
    return this.userProfileService.create(createUserProfileDto);
  }

  @Get()
  async findAll() {
    return await this.userProfileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userProfileService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return await this.userProfileService.update(+id, updateUserProfileDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userProfileService.remove(+id);
  }
}
