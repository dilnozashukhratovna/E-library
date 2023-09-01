import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface GenreAttr {
  name: string;
  description: string;
}

@Table({ tableName: 'genre' })
export class Genre extends Model<Genre, GenreAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Fantasy', description: 'Genre name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Its based on fantasy',
    description: 'Description to the genre',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;
}
