import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BrandsService {
  prisma = new PrismaClient();
  
    async create(CreateBrandDto: CreateBrandDto) {
        return await this.prisma.brands.create({
          data: {
            user_id: CreateBrandDto.user_id,
            brand_name: CreateBrandDto.brand_name,
          },
        });
    }

    async findAll() {
        return await this.prisma.brands.findMany({
          include: {
            user: true, // Include related user data
          },
        });
      
    }

    async findOne(id: number) {
        const brands = await this.prisma.brands.findUnique({
          where: { id },
          include: {
            user: {
              select: {
                username: true,
                profile: {
                  select: {
                    fullname: true,
                    address: true,
                    contact_number: true, \\CESS
                  }
                }
              }
            }
          },
        });
        if (!brands) throw new Error(`User profile with ID ${id} not found`);
        return brands;
    }

    async update(id: number, UpdateBrandDto: UpdateBrandDto) {
        return await this.prisma.brands.update({
          where: { id },
          data: {
            brand_name: UpdateBrandDto.brand_name,
          },
        });
      
    }
  
    async remove(id: number) {
        return await this.prisma.brands.delete({
          where: { id },
        });
    }
}

