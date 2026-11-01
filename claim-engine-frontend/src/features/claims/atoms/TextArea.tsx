
interface TextAreaProps {
    label?: string;
    name: string;
    value: string;
    placeholder?: string;
    rows?: number;
    maxLength?: number;
    error?: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
  }
  
  function TextArea({
    label,
    name,
    value,
    placeholder,
    rows = 4,
    maxLength,
    error,
    onChange,
    onBlur,
  }: TextAreaProps) {
    return (
      <div className="textarea-wrapper">
        {label && <label htmlFor={name}>{label}</label>}
  
        <textarea
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
        />
  
        {error && (
          <span id={`${name}-error`} className="field-error">
            {error}
          </span>
        )}
      </div>
    );
  }
  
  export default TextArea;
  