import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageDto } from './dto/image.dto';
import { Image } from './image.entity';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
  ) {}

  async getAll(): Promise<Image[]> {
    return await this.imageRepository.find();
  }

  async getImageById(id: number): Promise<Image> {
    const found = await this.imageRepository.findOne(id, { select: ['file'] });
    if (!found) throw new NotFoundException(`Image with ID ${id} not found.`);
    return found;
  }

  async saveImage(
    imageDto: ImageDto,
    file: Express.Multer.File,
  ): Promise<Image> {
    return this.imageRepository.saveImage(imageDto, file);
  }

  async deleteImage(id: number): Promise<void> {
    const result = await this.imageRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Image with ID ${id} not found.`);
  }
}
