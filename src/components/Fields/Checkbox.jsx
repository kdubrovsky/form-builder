import { useContext } from 'react';
import { UpdateDependenciesContext } from '../Form/context';

export default function CheckboxField({
  id,
  name,
  label,
  value,
  readOnly,
  hiddenLabel,
  enabled,
  messages,
}) {
  const updateDependencies = useContext(UpdateDependenciesContext);
  const labelClassname = hiddenLabel ? 'visually-hidden' : '';
  const isMessages = messages.length > 0;

  return (
    <div className='field checkbox'>
      <label className={labelClassname} htmlFor={id}>
        {label}
      </label>
      <input
        type='checkbox'
        id={id}
        name={name}
        value={name}
        checked={value}
        disabled={!enabled}
        readOnly={readOnly}
        onChange={e => updateDependencies(id, 'onChange', e.target.checked)}
        onBlur={() => {
          updateDependencies(id, 'onBlur');
        }}
      />
      {isMessages && <div className='error-messages'>{messages.join(', ')}</div>}
    </div>
  );
}
