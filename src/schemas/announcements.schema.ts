import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnnouncementDocument = Announcement & Document;

@Schema()
export class Announcement {
  @Prop({ required: true, maxlength: 20, minlength: 3 })
  from: string;

  @Prop({ required: true, maxlength: 30, minlength: 3 })
  email: string

  @Prop({ maxlength: 30, minlength: 3 })
  title: string

  @Prop({ required: true, maxlength: 1000, minlength: 5 })
  content: string;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);