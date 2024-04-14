import { Injectable } from '@nestjs/common';
import { CreateDocInfoDto } from './dto/create-doc-info.dto';
import { UpdateDocInfoDto } from './dto/update-doc-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DocInfo } from './entities/doc-info.entity';
import { Repository } from 'typeorm';


@Injectable()
export class DocInfoService {
  constructor(
    @InjectRepository(DocInfo)
    private docInfoRepository: Repository<DocInfo>,

  ) {}

  findAll(): Promise<DocInfo[]>{
    return this.docInfoRepository.find();
  }

  findOne(id: string): Promise<DocInfo | null>{
    return this.docInfoRepository.findOneBy({id});
  }

  async remove(id: string): Promise<void>{
    await this.docInfoRepository.delete(id);
  }
}
