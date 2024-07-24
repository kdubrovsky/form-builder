import { useImmer } from 'use-immer';
import { getNodes } from '../../lib';
import { UpdateNodesContext } from './context';

import Field from '../Field/Field';

export default function Form({ data, handler }) {
  const [nodes, updateNodes] = useImmer(() => getNodes(data.fields));

  return (
    <UpdateNodesContext.Provider value={updateNodes}>
      <form id={data.id} name={data.name} onSubmit={handler}>
        {nodes.map(node => (
          <Field key={node.id} field={node} />
        ))}
        <button type='submit'>Submit</button>
      </form>
    </UpdateNodesContext.Provider>
  );
}
