export const TextInput = ({ label, type, value, id, name, onChange }) => {
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
        />
      </div>
    </div>
  );
};
