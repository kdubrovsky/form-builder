export default function TextField({
  id,
  name,
  label,
  defaultValue,
  placeholder,
  readOnly,
  hiddenLabel,
  isEnabled,
}) {

  const labelClassname = hiddenLabel ? 'visually-hidden' : '';

  return (
    <div className='field'>
      <label htmlFor={id} className={labelClassname}>{label}</label>
      <input
        type='text'
        id={id}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={!isEnabled}
        readOnly={readOnly}
      />
    </div>
  );
}
