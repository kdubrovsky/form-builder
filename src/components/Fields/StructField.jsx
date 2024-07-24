import { useContext } from 'react';
import { findStructNode, getNodes } from '../../lib';
import { UpdateNodesContext } from '../Form/context';

import FieldSets from './FieldSets';

export default function StructField({
  id,
  label,
  capacity,
  count,
  hiddenLabel,
  readOnly,
  isEnabled,
  fieldsets,
}) {
  const updateNodes = useContext(UpdateNodesContext);

  const addChild = id => {
    updateNodes(draft => {
      const node = findStructNode(draft, id);
      const indexedId = [id, count].join('-');
      const indexedName = [node.name, count].join('-');

      const newNode = {
        id: indexedId,
        name: indexedName,
        type: 'fieldset',
        children: getNodes(node.struct, indexedId),
      };

      node.count = node.fieldsets.push(newNode);
    });
  };

  const removeChild = (parentId, i) => {
    updateNodes(draft => {
      const parentNode = findStructNode(draft, parentId);
      parentNode.fieldsets.splice(i, 1);
      parentNode.count--;
    });
  };

  const isVisibleAddButton = count < capacity && isEnabled;
  const labelClassname = hiddenLabel ? 'visually-hidden' : '';

  return (
    <div id={id} className='struct field'>
      <p className={labelClassname}>{label} </p>
      <FieldSets
        fieldsets={fieldsets}
        label={label}
        readOnly={readOnly}
        isEnabled={isEnabled}
        parentId={id}
        removeChild={removeChild}
      />
      {isVisibleAddButton && (
        <button
          className='struct-button'
          onClick={e => {
            e.preventDefault();
            addChild(id);
          }}
          disabled={!isEnabled}
        >
          Add {label}
        </button>
      )}
    </div>
  );
}
