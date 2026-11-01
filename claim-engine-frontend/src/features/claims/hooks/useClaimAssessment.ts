import { useState } from 'react';

import { assessClaim } from '../services/claimsApi';

import type {
  ClaimFormData,
  ClaimAssessmentResponse,
} from '../types/claim.types';

const initialFormData: ClaimFormData = {
  productName: '',
  formulaDescription: '',
  claimText: '',
  evidenceText: '',
};

type FormErrors = Partial<Record<keyof ClaimFormData, string>>;

export function useClaimAssessment() {
  const [formData, setFormData] =
    useState<ClaimFormData>(initialFormData);

  const [errors, setErrors] = useState<FormErrors>({});

  const [touched, setTouched] = useState<
    Partial<Record<keyof ClaimFormData, boolean>>
  >({});

  const [loading, setLoading] = useState(false);

  const [result, setResult] =
    useState<ClaimAssessmentResponse | null>(null);

  const [apiError, setApiError] = useState('');

  // Validate individual fields
  const validateField = (
    field: keyof ClaimFormData,
    value: string,
  ): string => {
    if (!value.trim()) {
      return `${field} is required.`;
    }

    if (field === 'productName' && value.length > 150) {
      return 'Product name cannot exceed 150 characters.';
    }

    if (field === 'formulaDescription' && value.length > 1000) {
      return 'Formula description cannot exceed 1000 characters.';
    }

    return '';
  };

  // Handle field changes
  const updateField = (
    field: keyof ClaimFormData,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (touched[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: validateField(field, value),
      }));
    }
  };

  // Handle field blur
  const handleBlur = (field: keyof ClaimFormData) => {
    setTouched((previous) => ({
      ...previous,
      [field]: true,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: validateField(field, formData[field]),
    }));
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const field = key as keyof ClaimFormData;
      const error = validateField(field, formData[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    setTouched({
      productName: true,
      formulaDescription: true,
      claimText: true,
      evidenceText: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== '') &&
    formData.productName.length <= 150 &&
    formData.formulaDescription.length <= 1000;

  // Submit assessment
  const submitAssessment = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setApiError('');
      setResult(null);

      const response = await assessClaim(formData);
      setResult(response);
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : 'Something went wrong.',
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
    setResult(null);
    setApiError('');
  };

  return {
    formData,
    errors,
    touched,
    loading,
    result,
    apiError,
    isFormValid,
    updateField,
    handleBlur,
    submitAssessment,
    resetForm,
  };
}