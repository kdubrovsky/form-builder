const createNode = (field, parentId) => {
  const { id, name, type, label } = field;

  const nodeId = parentId ? [parentId, id].join('_') : id;

  const value = field?.value ?? '';
  const placeholder = field?.placeholder ?? '';
  const step = field?.step ?? 0;
  const assets = field?.assets ?? [];

  const struct = field?.struct ?? null;
  const capacity = field?.capacity ?? 0;
  const count = Math.min(field?.count ?? 0, capacity);

  const hiddenLabel = field?.hiddenLabel ?? false;
  const readOnly = field?.readOnly ?? false;

  const rules = field?.rules ?? null;

  const validation = field?.validation ?? null;
  const messages = [];

  const enabled = field?.enabled ?? true;
  const visible = field?.visible ?? true;
  const valid = true;

  return {
    id: nodeId,
    type,
    name,
    label,
    value,
    placeholder,
    step,
    assets,
    struct,
    count,
    capacity,
    hiddenLabel,
    readOnly,
    rules,
    validation,
    visible,
    enabled,
    valid,
    messages,
  };
};

export const createNodes = (fields, parentId) =>
  fields.map(field => {
    const node = createNode(field, parentId);

    if (field.type === 'struct')
      node.fieldsets = Array(node.count)
        .fill()
        .map((_, i) => {
          const indexedId = [node.id, i].join('-');
          const indexedName = [node.name, i].join('-');

          const fieldset = {
            id: indexedId,
            name: indexedName,
            type: 'fieldset',
            children: createNodes(node.struct, indexedId),
          };
          return fieldset;
        });
    return node;
  });

export const findNode = (nodes, id) => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.type === 'struct')
      for (const fieldset of node.fieldsets) {
        const result = findNode(fieldset.children, id);
        if (result) return result;
      }
  }
  return null;
};

export const getNewState = (node, rule) => {
  let newState = true;
  const properties = ['visible', 'enabled', 'valid'];

  if ('values' in rule.condition) {
    newState = newState && rule.condition.values.includes(node.value);
  }

  properties.forEach(property => {
    if (property in rule.condition)
      newState = newState && node[property] === rule.condition[property];
  });

  return newState ? rule.state : !rule.state;
};

const validateRule = (value, rule) => {
  // add new validation types here
  switch (rule.type) {
    case 'required':
      return !!value.trim();
    case 'regex': {
      const pattern = new RegExp(rule.pattern);
      return pattern.test(value);
    }
    default:
      return true;
  }
};

export const getNewValidityState = (node, event) => {
  let newValidityState = true;
  let messages = [];
  const isOnChange = event === 'onChange';

  for (const rule of node.validation) {
    if (isOnChange && !rule?.onChange) continue;

    const validationResult = validateRule(node.value, rule);
    if (!validationResult) messages.push(rule.message);
    newValidityState = newValidityState && validationResult;
  }
  return [newValidityState, messages];
};
