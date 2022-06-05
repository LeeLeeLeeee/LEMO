import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CursorDto {
    @IsNumber()
    @Type(() => Number)
    @ApiProperty()
    cursor: number;

    @IsNumber()
    @Type(() => Number)
    @ApiProperty()
    pageSize: number;
}
