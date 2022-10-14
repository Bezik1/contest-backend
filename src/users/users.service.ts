import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compareSync, genSalt, hash } from 'bcrypt'
import { UserInterface } from 'src/interfaces/user.interface';
import { Response } from 'src/interfaces/userResponse.interface';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Comment } from 'src/interfaces/comment.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(createUserDto: UserInterface): Promise<Response<User>> {
        try {
            const { username, email, password, comments } = createUserDto

            const salt = +process.env.SALT
            const hashedPassword = await hash(password, salt)

            const data = new this.userModel({
                username,
                email,
                password: hashedPassword,
                comments
            })
            
            return {
                status: 'succes',
                message: 'User saved succesfully',
                data: await data.save()
            }
        } catch(err) {
            return {
                status: 'error',
                message: `User saving error: ${err.message}`,
            } 
        }
    }

    async finAll(): Promise<Response<User>> {
        try {
            const data = await this.userModel.find()

            return {
                status: 'succes',
                message: 'Users got succesfully',
                data 
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Users getting error: ${err.message}`,
            } 
        }
    }

    
    async finAllNamesEmails(): Promise<Response<{ username: string, email: string, comments: Comment[] }[]>> {
        try {
            const users = await this.userModel.find()
            const data:{ username: string, email: string, comments: Comment[] }[] = []

            users.forEach(user =>{
                const { username, email, comments } = user

                data.push({
                    username,
                    email,
                    comments,
                })
            })

            return {
                status: 'succes',
                message: 'Users got succesfully',
                data 
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Users getting error: ${err.message}`,
            } 
        }
    }

    async findById(_id: string): Promise<Response<User>> {
        try {
            const data = await this.userModel.findOne({ _id }).exec()

            return {
                status: 'succes',
                message: 'User got succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `User getting error: ${err.message}`
            }
        }
    }

    async editById(_id: string, editUserDto: UserInterface): Promise<Response<User>> {
        try {
            const user = await this.userModel.findOne({ _id }).exec()
            const { username, email, password, comments } = editUserDto

            const salt = await genSalt(+process.env.SALT_ROUNDS)
            const hashedPassword = await hash(password, salt)

            const data = await user.update({
                    username,
                    email,
                    password: hashedPassword,
                    comments
                })

            return {
                status:'succes',
                message: 'User edited succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `User editing error: ${err.message}`
            }
        }
    }

    async deleteById(_id: string): Promise<Response<User>> {
        try {
            await this.userModel.deleteOne({ _id }).exec()

            return {
                status: 'succes',
                message: 'User deleted succesfully',
            }
        } catch(err) {
            return {
                status: 'error',
                message: `User deleting error ${err.message}`
            }
        }
    }

    async login(user: UserInterface): Promise<Response<User>> {
        try {
            const { username, email, password } = user
            const fetchedUser = await this.userModel.findOne({ username })

            const ifPassword = compareSync(password, fetchedUser.password)
            const ifEmail =  email === fetchedUser.email ? true : false

            switch(true){
                case (ifPassword === false):
                    return { status: 'error', message: 'Incorrect password'}
                case (ifEmail === false):
                    return { status: 'error', message: 'Incorrect email'}
                case (ifPassword && ifEmail):
                    return { status: 'succes', message: 'User loggined succesfully', data: 
                    await this.userModel.findOne({ _id: fetchedUser._id })}
            }
        } catch(err) {
            return {
                status: 'error',
                message: `User logging error: ${err.message}`
            }
        }
    }
}
