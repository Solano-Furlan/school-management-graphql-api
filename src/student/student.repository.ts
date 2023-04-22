import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Student, StudentDocument } from './entities/student.entity';
import { CreateStudentDto } from './dtos/create-user.dto';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectModel(Student.name)
    private readonly studentEntityRepository: Model<Student>,
  ) {}

  getStudents(): Promise<Student[]> {
    return this.studentEntityRepository.find().exec();
  }

  getStudentsByIds(studentIds: string[]): Promise<Student[]> {
    return this.studentEntityRepository
      .find({ id: { $in: studentIds } })
      .exec();
  }

  getStudent(id: string): Promise<Student> {
    return this.studentEntityRepository.findOne({ id: id }).exec();
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const { firstName, lastName }: CreateStudentDto = createStudentDto;
    const lesson: StudentDocument = await this.studentEntityRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return lesson.save();
  }
}
