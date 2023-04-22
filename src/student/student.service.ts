import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-user.dto';
import { Student } from './entities/student.entity';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.getStudents();
  }

  getStudentsByIds(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.getStudentsByIds(studentIds);
  }

  async getStudent(id: string): Promise<Student> {
    const student: Student = await this.studentRepository.getStudent(id);
    if (!student) {
      throw new NotFoundException(`Student with ID: ${id} not found`);
    }
    return student;
  }

  createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentRepository.createStudent(createStudentDto);
  }
}
