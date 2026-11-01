interface InputProps {
    label?: string;
    name: string;
    value: string;
    placeholder?: string;
    maxLength?: number;
    error?: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
  }
  
  function Input({
    label,
    name,
    value,
    placeholder,
    maxLength,
    error,
    onChange,
    onBlur,
  }: InputProps) {
    return (
      <div className="input-wrapper">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          id={name}
          name={name}
          type="text"
          value={value}
          placeholder={placeholder}
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
  
  export default Input;