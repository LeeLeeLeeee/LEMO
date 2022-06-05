import { Controller, Get } from '@nestjs/common';
import { Public } from 'decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/healthCheck')
    @Public()
    healthCheck(): string {
        return this.appService.getSurvived();
    }
}
