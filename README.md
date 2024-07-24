## Form builder

Form builder demo project. Creates form from JSON declarative config.

Example JSON dataset: `src/mindata.json`

### Install & Run

```bash
npm install
npm run dev
```

### Field properties

| *Key*           | *Description*                                              |
| --------------- | ---------------------------------------------------------- |
| `id`*           | Should be unique identifier                                |
| `name`*         | HTML name attribute                                        |
| `type`*         | Field semantic type (`text`, `checkbox`, `struct`)         |
| `label`*        | Human-readable field title.                                |
| `placeholder`   | Placeholder text. Ignored if not applicable.               |
| `defaultValue`  | Initial field value                                        |
| `step`          | Step for fields like `number`, `range` etc.                |
| `assets`        | Data array for `select` field                              |
| `struct`        | Fields array inside structure field                        |
| `count`         | Initial struct fiedsets count. Default — 0.                |
| `capacity`      | Maximum struct fieldsets count. Default — unlimited        |
| `hiddenLabel`   | Visually hide field label                                  |
| `readOnly`      | Set field mode as read only                                |
| `disabled`      | Disable field                                              |
--------------------------------------------------------------------------------

Supported field types: `text`, `checkbox`, `struct`
