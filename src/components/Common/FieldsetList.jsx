import Field from './Field';

export default function FieldsetList({
  fieldsets,
  label,
  readOnly,
  enabled,
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
        disabled={!enabled}
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
