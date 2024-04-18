import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type AuthDocument = Deal & Document;

@Schema()
export class Deal {
  @Prop({ required: false })
  subscription: string;

  @Prop({ required: false })
  price: number;

  @Prop({ required: false })
  tiket: number;

  @Prop({ required: false })
  yield$: number;

  @Prop({ required: false })
  daysLeft: number;

  @Prop({ required: false })
  sold: number;

  @Prop({ required: false })
  imageUrl: string;
}

export const DealSchema = SchemaFactory.createForClass(Deal);
