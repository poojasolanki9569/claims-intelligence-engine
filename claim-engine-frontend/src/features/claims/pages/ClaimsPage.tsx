import { useState } from 'react';
import ClaimsPageTemplate from '../templates/ClaimsPageTemplate';
import ClaimAssessmentForm from '../organisms/ClaimAssessmentForm';
import AssessmentResult from '../organisms/AssessmentResult';
import type { Assessment } from '../types/claim.types';

function ClaimsPage() {
  const [result, setResult] = useState<{
    claimId: string;
    assessment: Assessment;
  } | null>(null);

  return (
    <ClaimsPageTemplate
      form={
        <ClaimAssessmentForm
          onAssessmentComplete={setResult}
        />
      }
      result={
        result ? (
          <AssessmentResult
            claimId={result.claimId}
            assessment={result.assessment}
          />
        ) : null
      }
    />
  );
}

export default ClaimsPage;