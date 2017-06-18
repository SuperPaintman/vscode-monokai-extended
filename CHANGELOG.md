# Changelog
## 0.3.0
### GitGutter
#### `added` - colors for GitGutter

## 0.2.0
### JavaScript / TypeScirpt
#### `added` - color for `this`

```ts
class Animal {
  constructor() {
    // v
    this.name = "SuperPaintman"
  }
}
```

#### `added` - color for library variables

```ts
global
root
__dirname
__filename
```

#### `changed` - JSX component color

```jsx
<header className="header">
  <h1>todos</h1>
  {/*    v           */}
  <TodoTextInput newTodo
                 onSave={this.handleSave}
                 placeholder="What needs to be done?" />
</header>
```
