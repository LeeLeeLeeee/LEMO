import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getSurvived(): string {
        return "I'm good";
    }
}
