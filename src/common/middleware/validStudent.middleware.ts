import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";
import {students} from "src/db"

@Injectable()
export class ValidStudentMiddleware implements NestMiddleware {
    use(req: Request, res: Response,next:NextFunction) {
        console.log("This middleware is called!!");
        const studentID = req.params.studentID;
        const studentExists = students.some(student => {
            return student.id === studentID;
        });
        if(!studentExists){
            throw new HttpException("Student not Found",400);
        }
        next()
    }
}