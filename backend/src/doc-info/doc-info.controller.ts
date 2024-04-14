import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocInfoService } from './doc-info.service';
import { CreateDocInfoDto } from './dto/create-doc-info.dto';
import { UpdateDocInfoDto } from './dto/update-doc-info.dto';

@Controller('doc-info')
export class DocInfoController {
  constructor(private readonly docInfoService: DocInfoService) {}

  @Get()
  findAll() {
    return this.docInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docInfoService.findOne(id);
  }

}
