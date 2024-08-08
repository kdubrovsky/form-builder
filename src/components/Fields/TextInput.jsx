import { useContext } from 'react';
import { UpdateDependenciesContext } from '../Form/context';

export default function TextInput({
  id,
  name,
  label,
  value,
  placeholder,
  readOnly,
  hiddenLabel,
  enabled,
  valid,
  messages,
}) {
  const updateDependencies = useContext(UpdateDependenciesContext);
  const labelClassname = hiddenLabel ? 'visually-hidden' : '';
  const inputClassname = valid ? '' : 'invalid';
  const isMessages = messages.length > 0;

  return (
    <div className='field'>
      <label htmlFor={id} className={labelClassname}>
        {label}
      </label>
      <input
        className={inputClassname}
        type='text'
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={!enabled}
        readOnly={readOnly}
        onChange={e => {
          updateDependencies(id, 'onChange', e.target.value);
        }}
        onBlur={() => {
          updateDependencies(id, 'onBlur');
        }}
      />
      {isMessages && <div className='error-messages'>{messages.join(', ')}</div>}
    </div>
  );
}
