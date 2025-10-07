import { IsNotEmpty, IsOptional, IsString, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchMoviesDto {
  @ApiProperty({
    description: 'Movie title to search for',
    example: 'batman',
  })
  @IsNotEmpty()
  @IsString()
  query: string;

  @ApiProperty({
    description: 'Page number for pagination',
    example: '1',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  page?: string;
}
