import { Injectable } from '@nestjs/common';
import { students, teachers } from 'src/db';
import { createStudentDto, findStudentResponseDto, StudentResponseDto, updateStudentDto } from './dto/student.dto';
import {v4 as uuid} from "uuid";
import { findTeacherResponseDto } from 'src/teacher/dto/teacher.dto';

@Injectable()
export class StudentService {
    private students = students
    getStudents():StudentResponseDto[] {
        return this.students
    }

    getStudentByID(studentID:string):StudentResponseDto {
        // for(let x of students){
        //     if(x.id == studentID){
        //         return x;
        //     }
        // }

        // this is a better way
        return this.students.find(studentData => {
            return studentData.id === studentID
        })
    }

    createStudent(payLoad:createStudentDto):StudentResponseDto {
        const newStudent = {
            id: uuid(),
            ...payLoad
        }

        this.students.push(newStudent)
        return newStudent
    }

    updateStudent(payLoad:updateStudentDto,studentID:string) : StudentResponseDto {
        let updatedStudent : StudentResponseDto;

        const updatedStudentList = this.students.map(st => {
            if(st.id === studentID){
                updatedStudent = {
                    id:studentID,
                    ...payLoad
                }
                return updatedStudent;
            }
            else return st
        })
        this.students = updatedStudentList;
        return updatedStudent
    }
    
    getStudentsByTeacherID(teacherID: string):findStudentResponseDto[] {
        return this.students.filter(student => {
            return student.teacher === teacherID
        })
    }

    updateStudentTeacher(teacherID:string,studentID:string):findStudentResponseDto {
        let updatedStudent : StudentResponseDto;

        const updatedStudentList = this.students.map(st => {
            if(st.id === studentID){
                updatedStudent = {
                    ...st,
                    teacher: teacherID
                }
                return updatedStudent;
            } else return st;
        })
        this.students = updatedStudentList;
        return updatedStudent;
    }
}
