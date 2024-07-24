import CheckboxField from '../Fields/CheckboxField';
import StructField from '../Fields/StructField';
import TextField from '../Fields/TextField';

export default function Field({ field }) {
  if (field.isVisible)
    switch (field.type) {
      case 'text':
        return <TextField {...field} />;
      case 'checkbox':
        return <CheckboxField {...field} />;
      case 'struct':
        return <StructField {...field} />;
      default:
        return null;
    }
}
