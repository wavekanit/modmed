import { Module } from '@nestjs/common';
import { DocInfoService } from './doc-info.service';
import { DocInfoController } from './doc-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocInfo } from './entities/doc-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocInfo])],
  controllers: [DocInfoController],
  providers: [DocInfoService],
})
export class DocInfoModule {}
