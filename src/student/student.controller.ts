import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common"
import { createStudentDto,findStudentResponseDto,StudentResponseDto,updateStudentDto } from "./dto/student.dto"
import { StudentService } from "./student.service"

@Controller('students')
export class StudentController {

    constructor(private readonly studentService:StudentService) {}

    @Get() // get triggered when '/students' is called
    getStudents(): findStudentResponseDto[]{
        return this.studentService.getStudents()
    }

    @Get('/:studentID') // get triggered when '/student/any-id' is called
    getStudentByID( 
        @Param('studentID', new ParseUUIDPipe()) studentID:string 
    ): findStudentResponseDto{
        // console.log(studentID)
        return this.studentService.getStudentByID(studentID)
    }

    @Post()
    createStudent(
        @Body() body:createStudentDto
    ):StudentResponseDto {
        return this.studentService.createStudent(body)
        
    }

    @Put('/:studentID')
    updateStudentByID(
        @Param('studentID', new ParseUUIDPipe()) studentID:string,
        @Body() body:updateStudentDto
    ):StudentResponseDto {
        return this.studentService.updateStudent(body,studentID)
    }
}