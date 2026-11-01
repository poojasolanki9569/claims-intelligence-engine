import {
    IsNotEmpty,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class AssessClaimDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    productName: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    formulaDescription: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(2000)
    claimText: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(10000)
    evidenceText: string;
  }