import { Injectable } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user_profile.dto';
import { UpdateUserProfileDto } from './dto/update-user_profile.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserProfileService {
  prisma = new PrismaClient();
  async create(createUserProfileDto: CreateUserProfileDto) {
    return await this.prisma.user_profile.create({
      data: {
        user_id: createUserProfileDto.user_id,
        full_name: createUserProfileDto.full_name,
        address: createUserProfileDto.address,
        contact_number: createUserProfileDto.contact_number,

      },
  })
}

  async findAll() {
    return await this.prisma.user_profile.findMany(
      {
        select:{
          full_name: true,
          address: true,
          contact_number: true,
          user:{
            select:{
              username:true,
              password: true,
            }
          
          
          },
          
          
        }
      });
}

  async findOne(id: number) {
    return await this.prisma.user_profile.findUnique({where: {id: id}})
}

  async update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    return await this.prisma.user_profile.create({
      data: {
        user_id: updateUserProfileDto.user_id,
        full_name: updateUserProfileDto.full_name,
        address: updateUserProfileDto.address,
        contact_number: updateUserProfileDto.contact_number,

      },
  })
}

async remove(id: number) {
  return await this.prisma.user_profile.delete({ where: { id: id } });
}
}
