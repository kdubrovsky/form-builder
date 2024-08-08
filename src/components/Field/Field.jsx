import CheckboxField from '../Fields/Checkbox';
import TextInput from '../Fields/TextInput';

export default function Field({ field }) {
  if (field.isVisible)
    switch (field.type) {
      case 'text':
        return <TextInput {...field} />;
      case 'checkbox':
        return <CheckboxField {...field} />;
      case 'struct':
        return <StructField {...field} />;
      default:
        return null;
    }
}
