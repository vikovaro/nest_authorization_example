import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto implements ITokenDto {
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OWFjM2QzZC1jN2Y2LTQzMDMtYjg1ZC1lYWIxNGQxNmU5OWYiLCJyb2xlIjoiQWRtaW4iLCJ0eXBlIjoiQWNjZXNzIiwiZGF0ZSI6MTczMDQxODQyODc1OCwiaWF0IjoxNzMwNDE4NDI4LCJleHAiOjE3MzA0MjIwMjh9.ekuxgA-ONUoZsydxxsI3yhI6dT_luQZe6SQmf1nHxJs',
    })
    @Expose()
    token: string;
}

export interface ITokenDto {
    token: string;
}