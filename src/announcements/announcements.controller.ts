import { Body, Controller, Delete, Get, Put, Param, Post } from '@nestjs/common';
import { AnnouncementInterface } from 'src/interfaces/announcement.interface';
import { AnnouncementsService } from './announcements.service';

@Controller('announcements')
export class AnnouncementsController {
    constructor(private readonly userService: AnnouncementsService) {}

    @Post()
    async createQuiz(@Body() createUserDto: AnnouncementInterface) {
        return await this.userService.create(createUserDto)
    }

    @Get()
    async findAllQuizzes() {
        return await this.userService.finAll()
    }

    @Get(':id')
    async findQuiz(@Param('id') id: string) {
        return await this.userService.findById(id)
    }

    @Put(':id')
    async editQuiz(@Param('id') id: string, @Body() editUserDto: AnnouncementInterface) {
        return await this.userService.editById(id, editUserDto)
    }

    @Delete(':id')
    async deleteQuiz(@Param('id') id: string) {
        return await this.userService.deleteById(id)
    }
}
