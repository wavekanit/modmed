import { PartialType } from '@nestjs/mapped-types';
import { CreateDocInfoDto } from './create-doc-info.dto';

export class UpdateDocInfoDto extends PartialType(CreateDocInfoDto) {}
