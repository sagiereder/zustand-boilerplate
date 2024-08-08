import { create } from "zustand"
import { test, expect } from "vitest"
import * as Z from "../src"

test("should create boolean actions", () => {
  class BooleanStore {
    @Z.Boolean()
    value = false
  }

  const store = create(Z.generateStoreWithActions(BooleanStore))

  const storeValue = store.getState()

  expect(storeValue.getValue).toBeDefined()
  expect(storeValue.setValue).toBeDefined()
  expect(storeValue.toggleValue).toBeDefined()
})

test("should create number actions", () => {
  class NumberStore {
    @Z.Number()
    value = 0
  }

  const store = create(Z.generateStoreWithActions(NumberStore))

  const storeValue = store.getState()

  expect(storeValue.getValue).toBeDefined()
  expect(storeValue.setValue).toBeDefined()
  expect(storeValue.incrementValue).toBeDefined()
  expect(storeValue.resetValue).toBeDefined()
})

test("should create array actions", () => {
  class ArrayStore {
    @Z.Array()
    value = []
  }

  const store = create(Z.generateStoreWithActions(ArrayStore))

  const storeValue = store.getState()

  expect(storeValue.getValue).toBeDefined()
  expect(storeValue.setValue).toBeDefined()
  expect(storeValue.valueHasItem).toBeDefined()
  expect(storeValue.removeValue).toBeDefined()
  expect(storeValue.addValue).toBeDefined()
})

test("should test number getValue action", () => {
  class NumberStore {
    @Z.Number()
    value = 0
  }

  const store = create(Z.generateStoreWithActions(NumberStore))
  const storeValue = store.getState()

  expect(storeValue.getValue()).toBe(0)
})

test("should get the value", () => {
  class NumberStore {
    @Z.Number()
    value = 0
  }

  const store = create(Z.generateStoreWithActions(NumberStore))
  const storeValue = store.getState()

  storeValue.setValue(10)
  expect(storeValue.getValue()).toBe(10)
})

test("should set the value", () => {
  class NumberStore {
    @Z.Number()
    value = 0
  }

  const store = create(Z.generateStoreWithActions(NumberStore))
  const storeValue = store.getState()

  storeValue.setValue(10)
  expect(store.getState().value).toBe(10)
})

test("should increment the value", () => {
  class NumberStore {
    @Z.Number()
    value = 0
  }

  const store = create(Z.generateStoreWithActions(NumberStore))
  const storeValue = store.getState()

  storeValue.incrementValue()
  expect(store.getState().value).toBe(1)
})

test("should reset the value", () => {
  class NumberStore {
    @Z.Number()
    value = 0
  }

  const store = create(Z.generateStoreWithActions(NumberStore))
  const storeValue = store.getState()

  storeValue.setValue(10)
  expect(store.getState().value).toBe(10)
  storeValue.resetValue()
  expect(store.getState().value).toBe(0)
})

test("should toggle the value", () => {
  class BooleanStore {
    @Z.Boolean()
    value = false
  }

  const store = create(Z.generateStoreWithActions(BooleanStore))
  const storeValue = store.getState()

  storeValue.toggleValue()

  expect(store.getState().value).toBe(true)
})

test("should add the item", () => {
  interface Item {
    a: number
  }

  class ArrayStore {
    @Z.Array()
    items: Item[] = []
  }

  const store = create(Z.generateStoreWithActions(ArrayStore))
  const storeValue = store.getState()

  const item: Item = { a: 1 }
  storeValue.addItems(item)

  expect(store.getState().items.length).toBe(1)
  expect(store.getState().items[0]).toBe(item)
})

test("should remove the item", () => {
  interface Item {
    a: number
  }

  const item: Item = { a: 1 }

  class ArrayStore {
    @Z.Array()
    items: Item[] = [item]
  }

  const store = create(Z.generateStoreWithActions(ArrayStore))
  const storeValue = store.getState()

  storeValue.removeItems(item)

  expect(store.getState().items.length).toBe(0)
})

test("should return true for existing value in array", () => {
  interface Item {
    a: number
  }

  const item: Item = { a: 1 }

  class ArrayStore {
    @Z.Array()
    items: Item[] = [item]
  }

  const store = create(Z.generateStoreWithActions(ArrayStore))
  const storeValue = store.getState()

  expect(storeValue.itemsHasItem(item)).toBe(true)
})

test("should return false for value not in array", () => {
  interface Item {
    a: number
  }

  const item: Item = { a: 1 }

  class ArrayStore {
    @Z.Array()
    items: Item[] = []
  }

  const store = create(Z.generateStoreWithActions(ArrayStore))
  const storeValue = store.getState()

  expect(storeValue.itemsHasItem(item)).toBe(false)
})
