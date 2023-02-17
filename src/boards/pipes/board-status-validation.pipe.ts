import { BadGatewayException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadGatewayException(`${value} isn't status options`);
    }
    return value;
  }
  private isStatusValid(status: any) {
    console.log(status);
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
