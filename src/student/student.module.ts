import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './entities/student.entity';
import { StudentRepository } from './student.repository';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
  ],
  providers: [StudentService, StudentResolver, StudentRepository],
  exports: [StudentService],
})
export class StudentModule {}
