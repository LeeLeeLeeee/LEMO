import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmaileDto {
    @IsEmail()
    @ApiProperty()
    recipient: string;
}

export class EmailConfirmationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    token: string;
}
