import { Controller, Post, Body } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { AssessClaimDto } from './dto/assess-claim.dto';

@Controller('api/claims')
export class ClaimsController {
    constructor(private readonly claimsService: ClaimsService) {}
    @Post('assess')
    assessClaim(@Body() assessClaimDto: AssessClaimDto) {
        return this.claimsService.assessClaim(assessClaimDto);
    }

}
