import { useEffect } from 'react';

import Input from '../atoms/Input';
import TextArea from '../atoms/TextArea';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';

import { useClaimAssessment } from '../hooks/useClaimAssessment';

import type { ClaimAssessmentResponse } from '../types/claim.types';

interface ClaimAssessmentFormProps {
  onAssessmentComplete: (response: ClaimAssessmentResponse) => void;
}

function ClaimAssessmentForm({
  onAssessmentComplete,
}: ClaimAssessmentFormProps) {
  const {
    formData,
    errors,
    loading,
    result,
    apiError,
    isFormValid,
    updateField,
    handleBlur,
    submitAssessment,
  } = useClaimAssessment();

  useEffect(() => {
    if (result) {
      onAssessmentComplete(result);
    }
  }, [result, onAssessmentComplete]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitAssessment();
  };

  return (
    <form onSubmit={handleSubmit} className="claim-form">
      <FormField
        label="Product Name"
        htmlFor="productName"
        error={errors.productName}
      >
        <Input
          name="productName"
          value={formData.productName}
          placeholder="e.g. Revitalift Anti-Aging Cream"
          maxLength={150}
          onChange={(value) => updateField('productName', value)}
          onBlur={() => handleBlur('productName')}
        />
      </FormField>

      <FormField
        label="Formula Description"
        htmlFor="formulaDescription"
        error={errors.formulaDescription}
      >
        <TextArea
          name="formulaDescription"
          value={formData.formulaDescription}
          placeholder="Describe the product formula and its ingredients..."
          rows={3}
          maxLength={1000}
          onChange={(value) => updateField('formulaDescription', value)}
          onBlur={() => handleBlur('formulaDescription')}
        />
      </FormField>

      <FormField
        label="Proposed Claim"
        htmlFor="claimText"
        error={errors.claimText}
      >
        <TextArea
          name="claimText"
          value={formData.claimText}
          placeholder="e.g. Reduces wrinkles by 20% in 4 weeks"
          rows={3}
          onChange={(value) => updateField('claimText', value)}
          onBlur={() => handleBlur('claimText')}
        />
      </FormField>

      <FormField
        label="Scientific Evidence"
        htmlFor="evidenceText"
        error={errors.evidenceText}
      >
        <TextArea
          name="evidenceText"
          value={formData.evidenceText}
          placeholder="Provide clinical study findings or supporting evidence..."
          rows={5}
          onChange={(value) => updateField('evidenceText', value)}
          onBlur={() => handleBlur('evidenceText')}
        />
      </FormField>

      {apiError && (
        <p className="api-error" role="alert">
          {apiError}
        </p>
      )}

      <Button type="submit" disabled={!isFormValid} loading={loading}>
        Assess Claim
      </Button>
    </form>
  );
}

export default ClaimAssessmentForm;