import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentDto } from './dtos/create-user.dto';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

@Resolver((_type: Student) => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query((_returns) => [Student])
  getStudents() {
    return this.studentService.getStudents();
  }

  @Query((_returns) => Student)
  getStudent(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Mutation((_returns) => Student)
  createStudent(@Args('createStudentDto') createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }
}
