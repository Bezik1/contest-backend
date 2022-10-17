import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnnouncementInterface } from 'src/interfaces/announcement.interface';
import { Response } from 'src/interfaces/userResponse.interface';
import { Announcement, AnnouncementDocument } from 'src/schemas/announcements.schema';

@Injectable()
export class AnnouncementsService {
    constructor(@InjectModel(Announcement.name) private announcementModel: Model<AnnouncementDocument>) {}

    async create(createAnnouncementDto: AnnouncementInterface): Promise<Response<Announcement>> {
        try {
            const { from, title, email, content } = createAnnouncementDto

            const data = new this.announcementModel({
                from,
                title,
                email,
                content,
            })
            
            return {
                status: 'succes',
                message: 'Announcement saved succesfully',
                data: await data.save()
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcement saving error`,
            } 
        }
    }

    async finAll(): Promise<Response<Announcement>> {
        try {
            const data = await this.announcementModel.find()

            return {
                status: 'succes',
                message: 'Announcements got succesfully',
                data 
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcements getting error`,
            } 
        }
    }

    async findById(_id: string): Promise<Response<Announcement>> {
        try {
            const data = await this.announcementModel.findOne({ _id }).exec()

            return {
                status: 'succes',
                message: 'Announcement got succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcement getting error`
            }
        }
    }

    async editById(_id: string, editAnnouncementDto: AnnouncementInterface): Promise<Response<Announcement>> {
        try {
            const Announcement = await this.announcementModel.findOne({ _id }).exec()
            const { from, email, title, content } = editAnnouncementDto

            const data = await Announcement.update({
                from,
                email,
                title,
                content,
            })

            return {
                status:'succes',
                message: 'Announcement edited succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcement editing error`
            }
        }
    }

    async deleteById(_id: string): Promise<Response<Announcement>> {
        try {
            await this.announcementModel.deleteOne({ _id }).exec()

            return {
                status: 'succes',
                message: 'Announcement deleted succesfully',
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcement deleting error`
            }
        }
    }
}

