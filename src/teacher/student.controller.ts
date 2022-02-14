import { Body, Controller, Get, Param, ParseIntPipe, Put, ParseUUIDPipe } from "@nestjs/common";
import { findStudentResponseDto,StudentResponseDto } from "src/student/dto/student.dto";
import { StudentService } from "src/student/student.service";

@Controller('teachers/:teacherID/students')
export class StudentTeacherController {
    constructor(private readonly studentService:StudentService) {}

    
    @Get()
    getStudentsOfTeacherByID(
        @Param('teacherID', new ParseUUIDPipe()) teacherID : string
    ):StudentResponseDto[] {
        return this.studentService.getStudentsByTeacherID(teacherID)
    }

    @Put('/:studentID')
    updateStudentTeacher(
        @Param('teacherID', new ParseUUIDPipe()) teacherID : string,
        @Param('studentID', new ParseUUIDPipe()) studentID : string,
        @Body() body
    ):findStudentResponseDto {
        return this.studentService.updateStudentTeacher(teacherID,studentID);
    }

}