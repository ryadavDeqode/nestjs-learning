import { Controller, Get, Param, Put,ParseUUIDPipe } from "@nestjs/common";
import { findTeacherResponseDto } from "./dto/teacher.dto";
import { TeacherService } from "./teacher.service";

@Controller('teachers')
export class TeacherController {
    constructor(private readonly teacherService:TeacherService) {}

    @Get()
    getTeachers():findTeacherResponseDto[] {
        return this.teacherService.getTeachers()
    }

    @Get('/:teacherID')
    getTeacherByID(
        @Param('teacherID', new ParseUUIDPipe()) teacherID:string
    ):findTeacherResponseDto {
        return this.teacherService.getTeacherByID(teacherID)
    }

    /*
    
        The below two routes begin with '/:teacherID/students'
        and there could be more such when our app is large and 
        hence we will create a separate controller for this
    
    // @Get('/:teacherID/students')
    // getStudentsOfTeacherByID() {
    //     return "teacher teaches students"
    // }

    // @Put('/:teacherID/students/:studentID')
    // updateStudenTeacher() {
    //     return "student teacher data updated"
    // }

    */
}