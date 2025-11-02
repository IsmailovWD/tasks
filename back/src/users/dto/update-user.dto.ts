import { IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() position?: string;
  @IsOptional() @IsString() bio?: string;
  @ValidateIf(
    (o) =>
      o.password &&
      o.password !== '' &&
      o.password !== null &&
      o.password !== undefined,
  )
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
