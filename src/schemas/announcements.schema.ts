import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnnouncementDocument = Announcement & Document;

@Schema()
export class Announcement {
  @Prop({ maxlength: 20, minlength: 3 })
  from: string;

  @Prop({ maxlength: 1000, minlength: 5 })
  content: string;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);