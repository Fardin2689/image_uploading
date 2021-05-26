import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { ImageModule } from './image/image.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), ImageModule],
})
export class AppModule {}
