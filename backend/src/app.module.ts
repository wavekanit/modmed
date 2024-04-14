import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocInfo } from './doc-info/entities/doc-info.entity';
import { DocInfoModule } from './doc-info/doc-info.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'modmed',
    entities: [DocInfo],
    synchronize: true,
  }),DocInfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
