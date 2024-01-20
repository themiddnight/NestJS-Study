import { Controller, Get, Query } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('reset')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Get()
  @ApiOperation({ summary: 'Reset database' })
  @ApiQuery({ name: 'reset', required: true })
  reset(@Query('reset') reset: boolean) {
    return this.resetService.reset(reset);
  }
}
