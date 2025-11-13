# Dev documentation

| Directory/file | Explanation | Notes |
| -- | -- | -- |
| .husky | pre-commit and pre-push hooks. These are run before said git operations to ensure code quality. | -
| dist | Swagger maintains automatically | -
| functions | Collection of the actual Lambda functions' "root" code. The main functionality and logic flow should be implemented here, but every piece of functionality not related to the Lambda itself should be abstracted into its own module inside the `libs` directory. | -
| libs | Generally, the majority of the functions' internal logic is actually placed here. We tend to maintain a heavily object-oriented programming style with these, but for small pieces it's not absolutely necessary. | -
| tests | Everything test-related. We aim to maintain the same structure as with the original js files, so that relevant tests are possible to be found. Follow TDD as much as possible, ideally adding comprehensive unit tests at some point. | -
| tools | If no other directory makes sense for a script or a tool. | Currently this folder is not in the blueprint, we would have things like the local development initialisation script in here
| package.json | Dependencies and dev scripts | -
| libs/logging | To be implemented in every single module! This is important, because it unifies the logging behind a single configuration setting. More on this on [Logging](#logging). | -

## Logging
For initialising logging, write the following lines at the end of your imports.
Also fix the path to `libs/logging` depending on where the current module itself
is. The `getLogger` function sets up the logger to append the file name at the
end of the logs for some extra visibility. To get it to use the right file name,
just pass the built-in `__filename` variable to the function.
```js
import { getLogger } from '../../libs/logging';

const logger = getLogger(__filename);
```

## Styling
- Keep documentation and Markdown file line length under 80 characters if possible
  - Ruler is configured in VSCode configs to help with this
- Linting settings are built-in
- Function code style
  - Use `function foo() {}` syntax instead of `() => {}` on top-level and within classes
  - Use `() => {}` syntax instead of `function foo() {}` in callbacks
  - Be absolutely consistent with the above rules
