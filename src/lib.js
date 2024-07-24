const getNormalizedNode = (field, parentId) => {
  const { id, name, type, label } = field;

  const placeholder = field?.placeholder ?? '';
  const defaultValue = field?.defaultValue ?? '';
  const step = field?.step ?? 0;
  const assets = field?.assets ?? [];
  const struct = field?.struct ?? null;
  const capacity = field?.capacity ?? 0;
  const count = Math.min(field?.count ?? 0, capacity);
  const hiddenLabel = field?.hiddenLabel ?? false;
  const readOnly = field?.readOnly ?? false;
  const isEnabled = !field?.disabled ?? true;
  const isVisible = true;
  const isValid = true;

  const nodeId = parentId ? [parentId, id].join('_') : id;

  return {
    id: nodeId,
    name,
    type,
    label,
    placeholder,
    defaultValue,
    step,
    assets,
    struct,
    count,
    capacity,
    hiddenLabel,
    readOnly,
    isVisible,
    isEnabled,
    isValid,
  };
};

export const getNodes = (fields, parentId) =>
  fields.map(field => {
    const node = getNormalizedNode(field, parentId);

    if (field.type === 'struct')
      node.fieldsets = Array(node.count)
        .fill()
        .map((_, i) => {
          const indexedId = `${node.id}-${i}`;
          const indexedName = `${node.name}-${i}`;
          const fieldset = {
            id: indexedId,
            name: indexedName,
            type: 'fieldset',
            children: getNodes(node.struct, indexedId),
          };

          return fieldset;
        });
    return node;
  });

export const findStructNode = (nodes, id) => {
  for (const node of nodes) {
    if (node.type === 'struct') {
      if (node.id === id) return node;
      else {
        for (const fieldset of node.fieldsets) {
          const result = findStructNode(fieldset.children, id);
          if (result) return result;
        }
      }
    }
  }
  return null;
};
