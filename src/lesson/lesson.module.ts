import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from 'src/student/student.module';
import { Lesson, LessonSchema } from './entities/lesson.entity';
import { LessonRepository } from './lesson.repository';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Lesson.name,
        schema: LessonSchema,
      },
    ]),
    StudentModule,
  ],
  providers: [LessonResolver, LessonService, LessonRepository],
})
export class LessonModule {}
