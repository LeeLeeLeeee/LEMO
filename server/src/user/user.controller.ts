import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get('/self')
    async self(@Req() request: Request & { user: any }) {
        const user = await this.userService.getSelf(request.user.userID);
        return user;
    }
}
