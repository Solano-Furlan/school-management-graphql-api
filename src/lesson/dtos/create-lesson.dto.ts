import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsString } from 'class-validator';

@InputType()
export class CreateLessonDto {
  @IsString()
  @Field()
  readonly name: string;

  @Field()
  @IsDateString()
  readonly startDate: string;

  @Field()
  @IsDateString()
  readonly endDate: string;
}
