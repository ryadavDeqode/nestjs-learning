import { Injectable } from '@nestjs/common';
import { findTeacherResponseDto } from './dto/teacher.dto';
import { teachers } from 'src/db';

@Injectable()
export class TeacherService {
    getTeachers():findTeacherResponseDto[] {
        return teachers;
    }

    getTeacherByID(teacherID):findTeacherResponseDto {
        return teachers.find(teacher => {
            return teacher.id === teacherID
        })
    }
}
