import { Controller, Get, Post, Delete, Param, Body, ValidationPipe, UsePipes, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@ApiTags('favorites')
@Controller('api/favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all favorite movies' })
  @ApiResponse({ status: 200, description: 'Returns list of all favorite movies' })
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post()
  @Version('1')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Add a movie to favorites' })
  @ApiBody({ type: AddFavoriteDto })
  @ApiResponse({ status: 201, description: 'Movie successfully added to favorites' })
  @ApiResponse({ status: 404, description: 'Movie not found in OMDb' })
  @ApiResponse({ status: 400, description: 'Invalid imdbID format' })
  async addFavorite(@Body() addFavoriteDto: AddFavoriteDto) {
    return this.favoritesService.addFavorite(addFavoriteDto.imdbID);
  }

  @Delete(':imdbID')
  @Version('1')
  @ApiOperation({ summary: 'Remove a movie from favorites' })
  @ApiParam({ name: 'imdbID', description: 'IMDb ID of the movie to remove' })
  @ApiResponse({ status: 200, description: 'Movie successfully removed from favorites' })
  removeFavorite(@Param('imdbID') imdbID: string) {
    return this.favoritesService.removeFavorite(imdbID);
  }
}
