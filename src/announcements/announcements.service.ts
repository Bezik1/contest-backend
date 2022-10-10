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
            const { from, content } = createAnnouncementDto

            const data = new this.announcementModel({
                from,
                content
            })
            
            return {
                status: 'succes',
                message: 'Announcement saved succesfully',
                data: await data.save()
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcement saving error: ${err.message}`,
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
                message: `Announcements getting error: ${err.message}`,
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
                message: `Announcement getting error: ${err.message}`
            }
        }
    }

    async editById(_id: string, editAnnouncementDto: AnnouncementInterface): Promise<Response<Announcement>> {
        try {
            const Announcement = await this.announcementModel.findOne({ _id }).exec()
            const { from, content } = editAnnouncementDto

            const data = await Announcement.update({
                from,
                content
            })

            return {
                status:'succes',
                message: 'Announcement edited succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcement editing error: ${err.message}`
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
                message: `Announcement deleting error ${err.message}`
            }
        }
    }
}

