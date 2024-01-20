import { Body, Controller, Put } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('reset')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Put()
  @ApiOperation({ summary: 'Reset database' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        reset: {
          type: 'boolean',
        },
      },
    },
  })
  reset(@Body('reset') reset: boolean) {
    return this.resetService.reset(reset);
  }
}
