import { TextField } from '@mui/material';

export const TextInput = ({ label, type, id, name, value, onChange, required, pattern, ...props }) => {
  return (
    <TextField
      label={label}
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      inputProps={{ pattern }}
      fullWidth
      margin="normal"
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
          '&:hover fieldset': {
            borderColor: 'var(--primary-300)'
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--primary-500)'
          }
        },
        '& .MuiInputLabel-root': {
          color: 'var(--neutral-600)',
          '&.Mui-focused': {
            color: 'var(--primary-600)'
          }
        },
        ...props.sx
      }}
    />
  );
};
