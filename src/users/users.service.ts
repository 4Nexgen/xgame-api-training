import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  prisma = new PrismaClient();
  async create(createUserDto: CreateUserDto) {
    return await this.prisma.users.create({
      data: {
        username: createUserDto.username,
        password: createUserDto.password,
        profiles: {
          create: {
            full_name: createUserDto.full_name,
            address: createUserDto.address,
            contact_number: createUserDto.contact_number, 
          }
        },
        brands: {
          create: {
            brand_name: createUserDto.brand_name,
          }
        }
      },
      include: {
        profiles: true,
        brands: true,
      }
    });
  }

  async findAll() {
    return await this.prisma.users.findMany({
      select:{
        username:true,
        password: true,
        profiles:{
          select:{
            full_name: true,
            address: true,
            contact_number: true,
          }
        },
        brands: true
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.users.findUnique({
      where: { id: id },
      include: {
        profiles: { 
          select: {
            id: true,
            full_name: true,
            address: true,
            contact_number: true,
          },
        },
        brands: true, 
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.prisma.users.update({
      where: { id: id },
      data: {
        username: updateUserDto.username,
        password: updateUserDto.password,
      },
    });
  
    return await this.prisma.users.findUnique({
      where: { id: id },
      include: {
        profiles: {
          select: {
            full_name: true,
            address: true,
            contact_number: true,
          },
        },
        brands: true,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.user_profile.deleteMany({
      where: { user_id: id }, 
    });
  
    await this.prisma.brand.deleteMany({
      where: { user_id: id },
    });
  
    return await this.prisma.users.delete({
      where: { id: id },
    });
  }
}
