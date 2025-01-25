import { Injectable } from '@nestjs/common';
import { CreateXgameDto } from './dto/create-xgame.dto';
import { UpdateXgameDto } from './dto/update-xgame.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class XgameService {
  prisma = new PrismaClient();
  async create(createXgameDto: CreateXgameDto) {
    return await this.prisma.users.create({
      data: {
        username: createXgameDto.username,
        password: createXgameDto.password,
        profiles: {
          create: {
            full_name: createXgameDto.full_name,
            address: createXgameDto.address,
            contact_number: createXgameDto.contact_number, 
          }
        },
        brands: {
          create: {
            brand_name: createXgameDto.brand_name,
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
  

  async update(id: number, updateXgameDto: UpdateXgameDto) {
    await this.prisma.users.update({
      where: { id: id },
      data: {
        username: updateXgameDto.username,
        password: updateXgameDto.password,
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
