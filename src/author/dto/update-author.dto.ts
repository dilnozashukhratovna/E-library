import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAuthorDto } from './create-author.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  @ApiProperty({ example: 'Robin Sharma', description: 'Author full name' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  full_name?: string;

  @ApiProperty({
    example:
      'Robin Sharma is a Canadian writer, best known for\
 his The Monk Who Sold His Ferrari book series. ',
    description: 'Short info about author',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  about?: string;
}
