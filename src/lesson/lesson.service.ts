import { Injectable, NotFoundException } from '@nestjs/common';
import { AssignStudentsToLessonDto } from './dtos/assign-students-to-lesson.dto';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { Lesson, LessonDocument } from './entities/lesson.entity';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.getLessons();
  }

  async getLesson(id: string): Promise<Lesson> {
    const lesson: Lesson = await this.lessonRepository.getLesson(id);
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID: ${id} not found`);
    }
    return lesson;
  }

  createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonRepository.createLesson(createLessonDto);
  }

  async assignStudentsToLesson(
    assignStudentsToLessonDto: AssignStudentsToLessonDto,
  ): Promise<Lesson> {
    const { lessonId, studentsIds }: AssignStudentsToLessonDto =
      assignStudentsToLessonDto;
    const lesson: LessonDocument = await this.lessonRepository.getLesson(
      lessonId,
    );
    return this.lessonRepository.assignStudentsToLesson(lesson, studentsIds);
  }
}
