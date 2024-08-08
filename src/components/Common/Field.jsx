import CheckboxField from '../Fields/Checkbox';
import TextInput from '../Fields/TextInput';
import Struct from './Struct';

export default function Field({ field }) {
  if (field.visible)
    switch (field.type) {
      case 'text':
        return <TextInput {...field} />;
      case 'checkbox':
        return <CheckboxField {...field} />;
      case 'struct':
        return <Struct {...field} />;
      default:
        return null;
    }
}
