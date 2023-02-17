import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }
  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return await this.boardsService.createBoard(createBoardDto);
  }
  @Get('/:id')
  async getBoardById(@Param('id') id: number): Promise<Board> {
    return await this.boardsService.getBoardById(id);
  }
  @Delete('/:id')
  async deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.boardsService.deleteBoard(id);
  }
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
