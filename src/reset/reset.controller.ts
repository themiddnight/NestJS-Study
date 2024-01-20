import { Body, Controller, Put } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('reset')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Put()
  @ApiOperation({ summary: 'Reset database' })
  @ApiBody({ type: Boolean })
  reset(@Body('reset') reset: boolean) {
    return this.resetService.reset(reset);
  }
}
