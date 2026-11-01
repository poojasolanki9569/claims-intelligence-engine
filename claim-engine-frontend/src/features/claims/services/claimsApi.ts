import type {
    ClaimFormData,
    ClaimAssessmentResponse,
  } from '../types/claim.types';
  
  const API_BASE_URL = 'http://localhost:3000/api';
  
  export async function assessClaim(
    formData: ClaimFormData,
  ): Promise<ClaimAssessmentResponse> {
    const response = await fetch(`${API_BASE_URL}/claims/assess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
  
      throw new Error(
        errorData?.message || 'Failed to assess the claim. Please try again.',
      );
    }
  
    return response.json() as Promise<ClaimAssessmentResponse>;
  }