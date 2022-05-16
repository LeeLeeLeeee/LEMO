import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmaileDto {
    @IsEmail()
    recipient: string;
}

export class EmailConfirmationDto {
    @IsString()
    @IsNotEmpty()
    token: string;
}
