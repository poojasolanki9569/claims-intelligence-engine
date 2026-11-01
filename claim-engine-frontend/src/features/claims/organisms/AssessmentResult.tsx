import type { Assessment } from '../types/claim.types';

interface AssessmentResultProps {
  assessment: Assessment;
  claimId: string;
}

function AssessmentResult({
  assessment,
  claimId,
}: AssessmentResultProps) {
  const { justified, confidenceScore, reasoning } = assessment;

  return (
    <section className="assessment-result">
      <h2>Assessment Result</h2>

      <p>
        <strong>Claim ID:</strong> {claimId}
      </p>

      <div className="result-status">
        <span>Claim Status</span>
        <strong className={justified ? 'status-justified' : 'status-not-justified'}>
          {justified ? 'Justified' : 'Not Justified'}
        </strong>
      </div>

      <div className="confidence-score">
        <span>Confidence Score</span>
        <strong>{confidenceScore}%</strong>
      </div>

      <div className="reasoning">
        <h3>AI Reasoning</h3>
        <p>{reasoning}</p>
      </div>

      <p className="review-note">
        AI-generated assessment is decision support, not a substitute for
        review and approval by a qualified scientific expert.
      </p>
    </section>
  );
}

export default AssessmentResult;