import Field from '../Field/Field';

export default function FieldSets({
  fieldsets,
  label,
  readOnly,
  isEnabled,
  parentId,
  removeChild,
}) {
  return fieldsets.map((fieldset, i) => (
    <fieldset id={fieldset.id} key={fieldset.id}>
      <legend>
        {label} #{i + 1}
      </legend>
      {fieldset.children.map(field => (
        <Field key={field.id} field={{ ...field, readOnly: readOnly }} />
      ))}
      <button
        className='struct-button'
        disabled={!isEnabled}
        onClick={e => {
          e.preventDefault();
          removeChild(parentId, i);
        }}
      >
        Remove {label}
      </button>
    </fieldset>
  ));
}
