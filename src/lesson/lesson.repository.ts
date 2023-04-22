import { Injectable } from '@nestjs/common';
import { Lesson, LessonDocument } from './entities/lesson.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonRepository {
  constructor(
    @InjectModel(Lesson.name)
    private readonly lessonEntityRepository: Model<Lesson>,
  ) {}

  getLessons(): Promise<Lesson[]> {
    return this.lessonEntityRepository.find().exec();
  }

  getLesson(id: string): Promise<LessonDocument> {
    return this.lessonEntityRepository.findOne({ id: id }).exec();
  }

  async createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const { name, startDate, endDate, studentsIds }: CreateLessonDto =
      createLessonDto;
    const lesson: LessonDocument = await this.lessonEntityRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students: studentsIds,
    });
    return lesson.save();
  }

  assignStudentsToLesson(
    lesson: LessonDocument,
    studentsIds: string[],
  ): Promise<Lesson> {
    lesson.students = [...lesson.students, ...studentsIds];
    return lesson.save();
  }
}
