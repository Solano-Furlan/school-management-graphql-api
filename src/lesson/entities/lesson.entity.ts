import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Student } from 'src/student/entities/student.entity';

export type LessonDocument = Lesson & Document;

@ObjectType()
@Schema()
export class Lesson {
  @Field((_type) => ID)
  @Prop({ unique: true, immutable: true })
  id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  startDate: string;

  @Field()
  @Prop()
  endDate: string;

  @Field((_type) => [Student], { defaultValue: [] })
  @Prop({ default: [] })
  students: string[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
