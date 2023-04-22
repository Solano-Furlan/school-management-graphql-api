import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateStudentDto {
  @Field()
  @IsString()
  @MinLength(1)
  readonly firstName: string;

  @Field()
  @IsString()
  @MinLength(1)
  readonly lastName: string;
}
