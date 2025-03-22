import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class TypeOrmConfig {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_PG_HOST,
      port: Number(process.env.DB_PG_PORT),
      username: process.env.DB_PG_USERNAME,
      password: process.env.DB_PG_PASSWORD,
      database: process.env.DB_PG_DATABASE,
      entities: [__dirname + './../**/*.entity.{js,ts}'],
      synchronize: true,
    };
  }
}
