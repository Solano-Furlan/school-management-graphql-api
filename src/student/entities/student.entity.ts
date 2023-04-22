import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type StudentDocument = Student & Document;

@ObjectType()
@Schema()
export class Student {
  @Field((_type) => ID)
  @Prop({ unique: true, immutable: true })
  id: string;

  @Field()
  @Prop()
  firstName: string;

  @Field()
  @Prop()
  lastName: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
