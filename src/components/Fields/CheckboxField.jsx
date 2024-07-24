export default function CheckboxField({
  id,
  name,
  label,
  defaultValue,
  readOnly,
  hiddenLabel,
  isEnabled,
}) {

  const labelClassname = hiddenLabel ? 'visually-hidden' : '';

  return (
    <div className='field checkbox'>
      <label className={labelClassname} htmlFor={id}>{label}</label>
      <input
        type='checkbox'
        id={id}
        name={name}
        value={name}
        defaultChecked={defaultValue}
        disabled={!isEnabled}
        readOnly={readOnly}
      />
    </div>
  );
}
