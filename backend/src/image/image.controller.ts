import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ImageDto } from './dto/image.dto';
import { Image } from './image.entity';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private imgageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  saveImage(
    @Body() body: ImageDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Image> {
    return this.imgageService.saveImage(body, file);
  }

  @Get()
  getAll() {
    return this.imgageService.getAll();
  }

  @Delete(':id')
  deleteImage(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.imgageService.deleteImage(id);
  }

  @Get(':id')
  getImageById(@Param('id', ParseIntPipe) id: number): Promise<Image> {
    return this.imgageService.getImageById(id);
  }
}
