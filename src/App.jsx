import jsonFormData from './mindata.json';

import Form from './components/Form/Form';

const fakeSubmitHandler = e => {
  e.preventDefault();
  console.log('Form sent!');
};

export default function App() {
  return <Form data={jsonFormData} handler={fakeSubmitHandler} />;
}
