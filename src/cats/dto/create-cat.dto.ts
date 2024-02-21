import { IsString, IsInt } from 'class-validator';
export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}

export class UpdateCatDto {
  name: string;
  age: number;
  breed: string;
}

export class ListAllEntities {
  name: string;
  age: number;
  breed: string;
  limit: number;
}
