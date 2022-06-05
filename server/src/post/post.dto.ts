import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsString,
    IsUrl,
} from 'class-validator';

export class CreatePostDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    content: string;

    @IsUrl()
    @ApiProperty()
    thumbnailLink: string;
}

export class UpdatePostDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    content: string;

    @IsUrl()
    @ApiProperty()
    thumbnailLink: string;

    @IsBoolean()
    @ApiProperty()
    published: boolean;
}
