import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getSelf(userID: number) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userID,
                },
            });
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('Fail to get user', HttpStatus.BAD_REQUEST);
        }
    }
}
