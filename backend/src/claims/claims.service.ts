
import { Injectable, Logger } from '@nestjs/common';

import { AssessClaimDto } from './dto/assess-claim.dto';
import { AiService } from '../ai/ai.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClaimsService {
  private readonly logger = new Logger(ClaimsService.name);

  constructor(
    private readonly aiService: AiService,
    private readonly prismaService: PrismaService,
  ) {}

  async assessClaim(assessClaimDto: AssessClaimDto) {
    this.logger.log('Starting claim assessment');

    // Step 1: Get the AI assessment.
    const assessment = await this.aiService.assessClaim(
      assessClaimDto.productName,
      assessClaimDto.formulaDescription,
      assessClaimDto.claimText,
      assessClaimDto.evidenceText,
    );

    // Step 2: Save the claim and its assessment in PostgreSQL.
    const savedClaim = await this.prismaService.claim.create({
      data: {
        productName: assessClaimDto.productName,
        formulaDescription: assessClaimDto.formulaDescription,
        claimText: assessClaimDto.claimText,

        assessment: {
          create: {
            evidenceText: assessClaimDto.evidenceText,
            justified: assessment.justified,
            confidenceScore: assessment.confidenceScore,
            reasoning: assessment.reasoning,
          },
        },
      },
      select: {
        id: true,
      },
    });

    this.logger.log(
      `Claim assessment saved successfully. Claim ID: ${savedClaim.id}`,
    );

    // Step 3: Return the result to the frontend.
    return {
      claimId: savedClaim.id,
      assessment,
    };
  }
}
