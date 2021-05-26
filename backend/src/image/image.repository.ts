import { EntityRepository, Repository } from 'typeorm';
import { ImageDto } from './dto/image.dto';
import { Image } from './image.entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
  async saveImage(
    { name, size, type, dimension, created, uploaded, thumbnail }: ImageDto,
    file: Express.Multer.File,
  ): Promise<Image> {
    const img = new Image();
    img.name = name;
    img.size = size;
    img.type = type;
    img.dimension = dimension;
    img.created = created;
    img.uploaded = uploaded;
    img.thumbnail = thumbnail;

    img.file = file.buffer;
    await img.save();
    delete img.file;
    return img;
  }
}
