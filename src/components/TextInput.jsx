export const TextInput = ({
  label,
  type,
  value,
  id,
  name,
  onChange,
  required,
  pattern,
}) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          className="form-control"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          pattern={pattern}
        />
      </div>
    </div>
  );
};
