import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        /* TODO: log 관리 하기 */
        this.$on<any>('warn', (e) => {
            console.log(e);
        });
        this.$on<any>('error', (e) => {
            console.log(e);
        });

        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
