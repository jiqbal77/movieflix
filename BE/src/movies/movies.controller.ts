import { Controller, Get, Query, ValidationPipe, UsePipes, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { SearchMoviesDto } from './dto/search-movies.dto';

@ApiTags('movies')
@Controller('api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @Version('1')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Search movies by title' })
  @ApiQuery({ name: 'query', required: true, description: 'Movie title to search for' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)' })
  @ApiResponse({ status: 200, description: 'Returns search results with movies and total count' })
  @ApiResponse({ status: 400, description: 'Bad request - missing or invalid query parameter' })
  async search(@Query() searchDto: SearchMoviesDto) {
    const page = searchDto.page ? parseInt(searchDto.page, 10) : 1;
    return this.moviesService.search(searchDto.query, page);
  }
}
