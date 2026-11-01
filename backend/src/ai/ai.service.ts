import {
    Injectable,
    InternalServerErrorException,
    Logger,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import OpenAI from 'openai';
  
  export interface ClaimAssessmentResult {
    justified: boolean;
    confidenceScore: number;
    reasoning: string;
  }
  
  @Injectable()
  export class AiService {
    private readonly logger = new Logger(AiService.name);
    private readonly openai: OpenAI;
  
    constructor(private readonly configService: ConfigService) {
      this.openai = new OpenAI({
        apiKey: this.configService.getOrThrow<string>('OPENAI_API_KEY'),
      });
    }
  
    async assessClaim(
      productName: string,
      formulaDescription: string,
      claimText: string,
      evidenceText: string,
    ): Promise<ClaimAssessmentResult> {
      try {
        const response = await this.openai.responses.create({
          model: 'gpt-6-luna',
  
          instructions: `
  You are a scientific claims assessment assistant for cosmetic products.
  
  Evaluate whether the provided scientific evidence sufficiently supports
  the proposed product claim.
  
  Consider the following factors:
  
  1. Study design: Is the study design appropriate to support the claim?
  2. Sample size: Is the number of participants sufficient?
  3. Statistical significance: Are statistical results and variability provided?
  4. Measurement method: Is the measurement objective and reliable?
  5. Study population: Is the study population relevant to the intended consumers?
  6. Duration: Is the study duration appropriate for the claimed timeframe?
  7. Formula relevance: Does the evidence relate to the same product or a
     sufficiently similar formula?
  8. Claim accuracy: Does the evidence support the exact wording and scope
     of the proposed claim?
  
  Assessment rules:
  
  - Do not invent missing scientific details or study results.
  - Do not assume a claim is justified simply because reported results
    are close to the claimed results.
  - If important evidence is missing or insufficient, set justified to false.
  - Explain the main reasons behind your decision.
  - Be objective and conservative.
  - confidenceScore represents your confidence in the assessment,
    not a statistically calibrated probability.
  - The final decision must be reviewed by a qualified human scientific reviewer.
          `,
  
          input: `
  Product Name:
  ${productName}
  
  Formula Description:
  ${formulaDescription}
  
  Proposed Product Claim:
  ${claimText}
  
  Scientific Evidence:
  ${evidenceText}
          `,
  
          max_output_tokens: 500,
  
          text: {
            format: {
              type: 'json_schema',
              name: 'claim_assessment',
              strict: true,
              schema: {
                type: 'object',
                properties: {
                  justified: {
                    type: 'boolean',
                  },
                  confidenceScore: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 100,
                  },
                  reasoning: {
                    type: 'string',
                  },
                },
                required: [
                  'justified',
                  'confidenceScore',
                  'reasoning',
                ],
                additionalProperties: false,
              },
            },
          },
        });
  
        // Handle incomplete model responses.
        if (response.status !== 'completed') {
          throw new Error('AI assessment response was incomplete.');
        }
  
        // Extract the structured JSON response.
        const output = response.output_text;
  
        if (!output) {
          throw new Error('AI returned an empty response.');
        }
  
        const result = JSON.parse(output) as ClaimAssessmentResult;
  
        // Validate the response before returning it.
        if (
          typeof result.justified !== 'boolean' ||
          !Number.isInteger(result.confidenceScore) ||
          result.confidenceScore < 0 ||
          result.confidenceScore > 100 ||
          typeof result.reasoning !== 'string' ||
          result.reasoning.trim().length === 0
        ) {
          throw new Error('AI returned an invalid assessment.');
        }
  
        return result;
      } catch (error) {
        this.logger.error(
          'Failed to assess the product claim.',
          error instanceof Error ? error.message : undefined,
        );
  
        throw new InternalServerErrorException(
          'Unable to assess the claim at the moment. Please try again.',
        );
      }
    }
  }