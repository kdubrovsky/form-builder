## Form builder

Form builder demo project. Creates form from JSON declarative config.

Example JSON dataset: `src/mindata.json`

### Install & Run

#### npm

```bash
npm install
npm run dev
```

#### pnpm

```bash
pnpm install
pnpm dev
```

### Field properties

| _Key_         | _Description_                                       |
| ------------- | --------------------------------------------------- |
| `id`\*        | Should be unique identifier                         |
| `name`\*      | HTML name attribute                                 |
| `type`\*      | Field semantic type (`text`, `checkbox`, `struct`)  |
| `label`\*     | Human-readable field title.                         |
| `placeholder` | Placeholder text. Ignored if not applicable.        |
| `value`       | Initial field value                                 |
| `step`        | Step for fields like `number`, `range` etc.         |
| `assets`      | Data array for `select` field                       |
| `struct`      | Fields array inside structure field                 |
| `count`       | Initial struct fiedsets count. Default — 0.         |
| `capacity`    | Maximum struct fieldsets count. Default — unlimited |
| `hiddenLabel` | Visually hide field label                           |
| `readOnly`    | Set field mode as read only                         |
| `enabled`     | Enable/Disable field                                |
| `visible`     | Initial field visibility                            |
| `rules`       | Array of field affection rules                      |
| `validation`  | Array of field validation rules                     |

---

Supported field types: `text`, `checkbox`.

Use `struct` field type to make children fieldsets

### Rules

You can set array of rules for the _first level_ fields.

#### Rule structure

`id` - rule affects this id

`property` - rule controls this node property (`visible` | `enable`)

`state` - set this value if condition is true

`condition` - object with checks:

- `visible` (boolean)
- `enabled` (boolean)
- `values` (array of values, equals _any_ of them; checkbox has true or false as a value)

### Validation

You can set array of rules to validate any field

#### Validation rule structure

`type` - `required` or `regex` for now

`onChange` - if `true`, rules will be applied as user changing field value (default value is `false`)

`message` - error message for this validation rule

`pattern` - regular expression for `regex` typed validation
