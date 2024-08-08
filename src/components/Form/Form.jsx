import { useImmer } from 'use-immer';
import { createNodes, findNode, getNewState, getNewValidityState } from '../../lib';
import { UpdateDependenciesContext, UpdateNodesContext } from './context';

import Field from '../Common/Field';

export default function Form({ data, handler }) {
  const [nodes, updateNodes] = useImmer(() => createNodes(data.fields));

  const updateDependencies = (id, event, value) =>
    updateNodes(draft => {
      const node = findNode(draft, id);

      // update value
      if (value !== undefined) node.value = value;

      // update validity
      if (node.validation?.length > 0) {
        const [newValidityState, messages] = getNewValidityState(node, event);
        node.valid = newValidityState;
        node.messages = messages;
      }

      // run rules
      if (node.rules?.length > 0) {
        for (const rule of node.rules) {
          const nextNode = findNode(draft, rule.id);
          const currentState = nextNode[rule.property];
          const newState = getNewState(node, rule);

          if (currentState !== newState) {
            nextNode[rule.property] = newState;
            updateDependencies(rule.id);
          }
        }
      }
    });

  return (
    <UpdateDependenciesContext.Provider value={updateDependencies}>
      <UpdateNodesContext.Provider value={updateNodes}>
        <form id={data.id} name={data.name} onSubmit={handler}>
          {nodes.map(node => (
            <Field key={node.id} field={node} />
          ))}
          <button type='submit'>Submit</button>
        </form>
      </UpdateNodesContext.Provider>
    </UpdateDependenciesContext.Provider>
  );
}
