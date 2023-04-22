import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonDto {
  @IsUUID()
  @Field((_type) => ID)
  readonly lessonId: string;

  @IsUUID('4', { each: true })
  @Field((_type) => [ID])
  readonly studentsIds: string[];
}
