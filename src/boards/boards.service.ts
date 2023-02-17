import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './board.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}
  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoard();
  }
  async getBoardById(id: number): Promise<Board> {
    console.log(id);
    const found = await this.boardRepository.getBoardById(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDto);
  }
  async deleteBoard(id: number): Promise<void> {
    await this.boardRepository.deleteBoard(id);
  }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return await this.boardRepository.updateBoard(id, status);
  }
}
