import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddFavoriteDto {
  @ApiProperty({
    description: 'IMDb ID of the movie to add to favorites',
    example: 'tt0372784',
  })
  @IsNotEmpty()
  @IsString()
  imdbID: string;
}
