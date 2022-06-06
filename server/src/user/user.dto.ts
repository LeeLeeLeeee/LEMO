import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsUrl()
    @ApiProperty()
    githubLink: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsString()
    @ApiProperty()
    profileImage: string;
}
