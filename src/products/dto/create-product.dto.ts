import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ default: 100 })
  price: number;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({
    description: 'Category ID',
    default: 1,
  })
  category_id: number;
}
