# zustand-boilerplate

[![npm version](https://badgen.net/npm/v/zustand-boilerplate)](https://npm.im/zustand-boilerplate) [![npm downloads](https://badgen.net/npm/dm/zustand-boilerplate)](https://npm.im/zustand-boilerplate)

Features:

- Quickly generate basic state actions for your zustand store

## Example

you'll need to install zustand & reflect-metadata for zustand-boilerplate to work

```
import { create } from "zustand"
import * as Z from "zustand-boilerplate"

interface Bear {
  name: string
}

class BearStore {
  @Z.Boolean()
  isDangerous = false

  @Z.Number()
  count = 0

  @Z.Array()
  bears: Bear[] = []

  //
  // Notice you have to set a default value and apply the decorator
  // to properties for generated actions to work
  //
  @Z.Any()
  mainBear: Bear | undefined = undefined

  @Z.String()
  userName: string | undefined = undefined
}

const bearStoreWithActions = Z.generateStoreWithActions(BearStore)

export const store = create(bearStoreWithActions)
```

## Install

```bash
npm i zustand-boilerplate
```

## License

MIT &copy;
