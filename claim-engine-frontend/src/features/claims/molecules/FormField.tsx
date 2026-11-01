import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}

function FormField({
  label,
  htmlFor,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>{label}</label>

      {children}

      {error && (
        <p
          id={`${htmlFor}-error`}
          style={{
            color: 'red',
            fontSize: '13px',
            margin: '4px 0 0',
          }}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;