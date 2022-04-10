import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient({
        log: [
            { level: 'warn', emit: 'event' },
            { level: 'error', emit: 'event' },
        ],
    });
    /* TODO: log 관리 하기 */
    prisma.$on<any>('warn', (e) => {
        console.log(e);
    });
    prisma.$on<any>('error', (e) => {
        console.log(e);
    });
} else {
    if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient({ log: ['query', 'info'] });
    }
    prisma = (global as any).prisma;
}

export default prisma;
