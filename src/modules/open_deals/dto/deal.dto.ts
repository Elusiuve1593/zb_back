import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DealDTO {
  @IsNotEmpty()
  @IsString()
  subscription: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  tiket: number;

  @IsNotEmpty()
  @IsNumber()
  yield$: number;

  @IsNotEmpty()
  @IsNumber()
  daysLeft: number;

  @IsNotEmpty()
  @IsNumber()
  sold: number;
    
  imageName: string  
}
