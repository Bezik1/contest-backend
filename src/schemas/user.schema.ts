import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Comment } from 'src/interfaces/comment.interface';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, maxlength: 20, minlength: 3 })
  username: string;

  @Prop({ unique: true, maxlength: 30, minlength: 5 })
  email: string;

  @Prop()
  password: string;

  @Prop([Comment])
  comments: Comment[]

}

export const UserSchema = SchemaFactory.createForClass(User);