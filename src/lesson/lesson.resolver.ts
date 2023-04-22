import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { LessonService } from './lesson.service';

@Resolver((_type: Lesson) => Lesson)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query((_returns) => [Lesson])
  getLessons() {
    return this.lessonService.getLessons();
  }

  @Query((_returns) => Lesson)
  getLesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation((_returns) => Lesson)
  createLesson(@Args('createLessonDto') createLessonDto: CreateLessonDto) {
    return this.lessonService.createLesson(createLessonDto);
  }
}
