import { IsNumber, IsString } from '@nestjs/class-validator';

export class Payload {
  @IsNumber()
  sub: number;

  @IsString()
  username: string;
}
