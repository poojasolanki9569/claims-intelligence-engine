export interface ClaimFormData {
    productName: string;
    formulaDescription: string;
    claimText: string;
    evidenceText: string;
  }
  
  export interface Assessment {
    justified: boolean;
    confidenceScore: number;
    reasoning: string;
  }
  
  export interface ClaimAssessmentResponse {
    claimId: string;
    assessment: Assessment;
  }