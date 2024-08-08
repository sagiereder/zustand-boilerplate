import "reflect-metadata"
import type { StateCreator } from "zustand"

export function Number() {
  return Reflect.metadata("type", "number")
}

export function String() {
  return Reflect.metadata("type", "string")
}

export function Boolean() {
  return Reflect.metadata("type", "boolean")
}

export function Array() {
  return Reflect.metadata("type", "array")
}

export function Any() {
  return Reflect.metadata("type", "object")
}

const pascalCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export type InstanceWithActions<T extends object> = T & {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
} & {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void
} & {
  [K in keyof T as T[K] extends boolean
    ? `toggle${Capitalize<string & K>}`
    : never]: () => void
} & {
  [K in keyof T as T[K] extends number
    ? `reset${Capitalize<string & K>}`
    : never]: () => void
} & {
  [K in keyof T as T[K] extends number
    ? `increment${Capitalize<string & K>}`
    : never]: () => void
} & {
  [K in keyof T as T[K] extends Array<any> ? `${string & K}HasItem` : never]: (
    item: T[K] extends Array<any> ? T[K][number] : never,
  ) => boolean
} & {
  [K in keyof T as T[K] extends Array<any>
    ? `add${Capitalize<string & K>}`
    : never]: (item: T[K] extends Array<any> ? T[K][number] : never) => void
} & {
  [K in keyof T as T[K] extends Array<any>
    ? `remove${Capitalize<string & K>}`
    : never]: (item: T[K] extends Array<any> ? T[K][number] : never) => void
}

export const generateStoreWithActions =
  <TInstance extends object>(StoreClass: {
    new (): TInstance
  }): StateCreator<InstanceWithActions<TInstance>> =>
  (set: any, get: any) => {
    const instance: any = new StoreClass()
    const properties = Object.keys(instance)

    for (const propertyName of properties) {
      const type = Reflect.getMetadata("type", instance, propertyName)
      if (!type) {
        continue
      }
      const pascalCasePropertyName = pascalCase(propertyName)

      instance[`get${pascalCasePropertyName}`] = () => {
        return get()[propertyName]
      }

      instance[`set${pascalCasePropertyName}`] = (value: unknown) => {
        set({ [propertyName]: value })
      }

      switch (type) {
        case "number":
          instance[`reset${pascalCasePropertyName}`] = () => {
            set({ [propertyName]: 0 })
          }

          instance[`increment${pascalCasePropertyName}`] = () => {
            set({ [propertyName]: get()[propertyName] + 1 })
          }
        case "boolean":
          instance[`toggle${pascalCasePropertyName}`] = () => {
            set({ [propertyName]: !get()[propertyName] })
          }
        case "array":
          instance[`${propertyName}HasItem`] = (item: unknown) => {
            return get()[propertyName].includes(item)
          }
          instance[`add${pascalCasePropertyName}`] = (item: unknown) => {
            set({ [propertyName]: [...get()[propertyName], item] })
          }

          instance[`remove${pascalCasePropertyName}`] = (item: unknown) => {
            set({
              [propertyName]: get()[propertyName].filter(
                (existingItem: unknown) => existingItem !== item,
              ),
            })
          }
      }
    }

    return instance
  }
