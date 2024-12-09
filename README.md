# webstorm-bug

## Background

pkg-a has the following `exports` in package.json:

```json
".": {
  "@webstorm-bug/source": "./src/index.ts",
  "default": "./dist/index.js"
},
"./*": {
  "@webstorm-bug/source": "./src/*/index.ts",
  "default": "./dist/*/index.js"
},
"./*.js": {
  "@webstorm-bug/source": "./src/*.ts",
  "default": "./dist/*.js"
}
```

pkg-b lists pkg-a as a dependency and doesn't specify any custom conditions.

pkg-c lists pkg-a as a dependency and specifies the `@webstorm-bug/source` condition in tsconfig.json.

## Expected

Using the default condition in pkg-b:
1. Auto-importing CatDog inserts `import { CatDog } from '@webstorm-bug/pkg-a'`
2. Auto-importing Cat inserts `import { Cat } from '@webstorm-bug/pkg-a/cat'`
3. Auto-importing Dog inserts `import { Dog } from '@webstorm-bug/pkg-a/dog.js'`

Using the `@webstorm-bug/source` condition in pkg-c:
1. Auto-importing CatDog inserts `import { CatDog } from '@webstorm-bug/pkg-a'`
2. Auto-importing Cat inserts `import { Cat } from '@webstorm-bug/pkg-a/cat'`
3. Auto-importing Dog inserts `import { Dog } from '@webstorm-bug/pkg-a/dog.js'`

VS Code auto-imports all of these correctly.

## Actual

Using the default condition in pkg-b:
1. Auto-importing CatDog inserts `import { CatDog } from '@webstorm-bug/pkg-a'` ✅
2. Auto-importing Cat inserts `import { Cat } from '@webstorm-bug/pkg-a/cat.js'` ❌
3. Auto-importing Dog inserts `import { Dog } from '@webstorm-bug/pkg-a/dog.ts.js'` ❌

Using the `@webstorm-bug/source` condition in pkg-c:
1. Auto-importing CatDog inserts `import { CatDog } from '@webstorm-bug/pkg-a'` ✅
2. Auto-importing Cat inserts `import { Cat } from '@webstorm-bug/pkg-a/cat.js'` ❌
3. Auto-importing Dog inserts `import { Dog } from '@webstorm-bug/pkg-a/dog.ts.js'` ❌

TypeScript suggests the correct imports via context actions.
