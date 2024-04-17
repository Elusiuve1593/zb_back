import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type AuthDocument = Deal & Document;

export class RealEstate {
  @Prop({ required: false })
  subscription: string;

  @Prop({ required: false })
  price: number;

  @Prop({ required: false })
  tiket: number;

  @Prop({ required: false })
  yield: number;

  @Prop({ required: false })
  daysLeft: number;

  @Prop({ required: false })
  sold: number;

  @Prop({ required: false })
  imageName: string;
}

@Schema()
export class Deal {
  @Prop({ type: [RealEstate], required: true })
  realEstate: RealEstate[];
}

export const DealSchema = SchemaFactory.createForClass(Deal);
