import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
 
} from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ example: 'Robin Sharma', description: 'Author full name' })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    example:
      'Robin Sharma is a Canadian writer, best known for\
 his The Monk Who Sold His Ferrari book series. ',
    description: 'Short info about author',
  })
  @IsNotEmpty()
  @IsString()
  about: string;
}
