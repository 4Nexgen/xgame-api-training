import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BrandService {
  prisma = new PrismaClient();
  async create(createBrandDto: CreateBrandDto) {
    return await this.prisma.brand.create({
      data: {
        user_id: createBrandDto.user_id,
        brand_name: createBrandDto.brand_name
      },
    })
  }

  async findAll() {
    return await this.prisma.brand.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.brand.findUnique({where: {id: id}})
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.prisma.brand.update({
      where: { id: id },
      data: {
        user_id: updateBrandDto.user_id,
        brand_name: updateBrandDto.brand_name,
        
      },
    });
  }
  async remove(id: number) {
    return await this.prisma.brand.delete({ where: { id: id } });
  }
}
