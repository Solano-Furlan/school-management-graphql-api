import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateLessonDto {
  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsDateString()
  readonly startDate: string;

  @Field()
  @IsDateString()
  readonly endDate: string;

  @IsUUID('4', { each: true })
  @Field((_type) => [ID], { defaultValue: [] })
  readonly studentsIds: string[];
}
