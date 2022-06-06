import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Put,
    Req,
} from '@nestjs/common';
import { UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/self')
    @HttpCode(HttpStatus.OK)
    async self(@Req() request: Request & { user: any }) {
        const user = await this.userService.getSelf(request.user.userID);
        return user;
    }

    @Put('/:id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Req() request: Request & { user: any },
        @Body() resBody: UpdateUserDto,
    ): Promise<UserModel> {
        const {
            user: { userID },
        } = request;
        if (userID !== id) {
            throw new HttpException(
                "Can't update other user info",
                HttpStatus.FORBIDDEN,
            );
        }
        const user = await this.userService.updateUser({
            where: { id },
            data: { ...resBody },
        });
        return user;
    }
}
