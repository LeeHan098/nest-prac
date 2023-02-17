import { NotFoundException } from '@nestjs/common';
import { CustomRepository } from 'src/configs/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getBoardById(id: number): Promise<Board> {
    return await this.findOneBy({ id: id });
  }
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = await this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find id: ${id}`);
    }
    console.log('result', result);
  }
  async updateBoard(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    console.log(board);
    board.status = status;
    await this.save(board);
    return board;
  }
  async getAllBoard(): Promise<Board[]> {
    return this.find();
  }
}
