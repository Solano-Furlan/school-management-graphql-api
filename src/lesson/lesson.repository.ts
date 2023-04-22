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

  getLesson(id: string): Promise<Lesson> {
    return this.lessonEntityRepository.findOne({ id: id }).exec();
  }

  async createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const { name, startDate, endDate }: CreateLessonDto = createLessonDto;
    const lesson: LessonDocument = await this.lessonEntityRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
    });
    return lesson.save();
  }
}
