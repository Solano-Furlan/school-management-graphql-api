import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { AssignStudentsToLessonDto } from './dtos/assign-students-to-lesson.dto';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { LessonService } from './lesson.service';

@Resolver((_type: Lesson) => Lesson)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService,
  ) {}

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

  @Mutation((_returns) => Lesson)
  assignStudentsToLesson(
    @Args('AssignStudentsToLessonDto')
    assignStudentsToLessonDto: AssignStudentsToLessonDto,
  ) {
    return this.lessonService.assignStudentsToLesson(assignStudentsToLessonDto);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    console.log(Date.now().toString());
    return this.studentService.getStudentsByIds(lesson.students);
  }
}
