import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ValidStudentMiddleware } from 'src/common/middleware/validStudent.middleware';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
    exports:[StudentService],
    controllers: [StudentController],
    providers: [StudentService]
})
export class StudentModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidStudentMiddleware).forRoutes({
            path:'students/:studentID',
            method:RequestMethod.GET
        })
        consumer.apply(ValidStudentMiddleware).forRoutes({
            path:'students/:studentID',
            method:RequestMethod.PUT
        })
    }
}
