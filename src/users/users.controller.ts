import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Comment } from 'src/interfaces/comment.interface';
import { UserInterface } from 'src/interfaces/user.interface';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createQuiz(@Body() createUserDto: UserInterface) {
        return await this.userService.create(createUserDto)
    }

    @Get()
    async findAllQuizzes() {
        return await this.userService.finAll()
    }

    @Get('names')
    async finAllNamesEmails() {
        return await this.userService.finAllNamesEmails()
    }

    @Get(':id')
    async findQuiz(@Param('id') id: string) {
        return await this.userService.findById(id)
    }

    @Put(':id')
    async editQuiz(@Param('id') id: string, @Body() editUserDto: UserInterface) {
        return await this.userService.editById(id, editUserDto)
    }

    @Delete(':id')
    async deleteQuiz(@Param('id') id: string) {
        return await this.userService.deleteById(id)
    }

    @Post('login')
    async login(@Body() user: UserInterface) {
        return this.userService.login(user)
    }

    @Post('addComment')
    async addComment(@Body() editUserDto: { username: string, comment: Comment }) {
        return this.userService.addComment(editUserDto)
    }
}