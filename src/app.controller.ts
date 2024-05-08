import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Hello World! ')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'get Hello World',
    description: 'get Simple Hello World',
  })
  @ApiCreatedResponse({
    description: 'return Simple Hello World',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
