import { useContext } from 'react';
import { createNodes, findNode } from '../../lib';
import { UpdateNodesContext } from '../Form/context';

import FieldsetList from './FieldsetList';

export default function Struct({
  id,
  label,
  fieldsets,
  capacity,
  count,
  hiddenLabel,
  readOnly,
  enabled,
}) {
  const updateNodes = useContext(UpdateNodesContext);

  const addChild = id => {
    updateNodes(draft => {
      const node = findNode(draft, id);
      const indexedId = [id, count].join('-');
      const indexedName = [node.name, count].join('-');

      const newNode = {
        id: indexedId,
        name: indexedName,
        type: 'fieldset',
        children: createNodes(node.struct, indexedId),
      };

      node.count = node.fieldsets.push(newNode);
    });
  };

  const removeChild = (parentId, i) => {
    updateNodes(draft => {
      const parentNode = findNode(draft, parentId);
      parentNode.fieldsets.splice(i, 1);
      parentNode.count--;
    });
  };

  const visibleAddButton = count < capacity && enabled;
  const labelClassname = hiddenLabel ? 'visually-hidden' : '';

  return (
    <div id={id} className='struct field'>
      <p className={labelClassname}>{label} </p>
      <FieldsetList
        fieldsets={fieldsets}
        label={label}
        readOnly={readOnly}
        enabled={enabled}
        parentId={id}
        removeChild={removeChild}
      />
      {visibleAddButton && (
        <button
          className='struct-button'
          onClick={e => {
            e.preventDefault();
            addChild(id);
          }}
          disabled={!enabled}
        >
          Add {label}
        </button>
      )}
    </div>
  );
}
