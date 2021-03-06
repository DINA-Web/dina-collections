/* eslint-disable no-console, class-methods-use-this */
const PRIVATE_NAMESPACE = '_dependor'

const getKey = key => {
  return `${PRIVATE_NAMESPACE}-${key}`
}

const testing = process.env.NODE_ENV === 'test'

const defaultMockHandler = (...args) => {
  return args
}

const Dependor = class Dependor {
  constructor(dependencies = {}) {
    const originalDependenciesKey = getKey('dependencies')
    this[originalDependenciesKey] = {
      ...dependencies,
    }

    Object.keys(dependencies).forEach(key => {
      if (this[key]) {
        throw new Error(`Cant add dependency ${key}. Already exists`)
      }
      this[key] = dependencies[key]
    })
  }

  add(dependencies) {
    Object.keys(dependencies).forEach(key => {
      this[key] = dependencies[key]
    })
    const originalDependenciesKey = getKey('dependencies')
    this[originalDependenciesKey] = {
      ...this[originalDependenciesKey],
      ...dependencies,
    }
  }
  createSpies() {
    console.error('not allowed to call autoMock outside test')
  }
  mock() {
    console.error('not allowed to call reset outside test')
  }
  reset() {
    console.error('not allowed to call reset outside test')
  }
  freeze() {
    console.error('not allowed to call freeze outside test')
  }
}

const createFreezeFunction = key => {
  return () => {
    throw new Error(
      `Function ${key} is frozen in dependor and should not be called`
    )
  }
}

const TestDependor = class TestDependor extends Dependor {
  freeze(keys) {
    const originalDependenciesKey = getKey('dependencies')
    const originalDependencies = this[originalDependenciesKey]
    const keysToFreeze = keys || Object.keys(originalDependencies)
    this.mock(
      keysToFreeze.reduce((obj, key) => {
        if (this[key] === originalDependencies[key]) {
          return {
            ...obj,
            [key]: createFreezeFunction(key),
          }
        }
        return obj
      }, {})
    )
  }
  createSpies(handlers) {
    const originalDependenciesKey = getKey('dependencies')
    const originalDependencies = this[originalDependenciesKey]
    return Object.keys(originalDependencies).reduce((spies, dependency) => {
      const spy = jest.fn()
      const func = (...args) => {
        spy(...args)
        const handler = (handlers && handlers[dependency]) || defaultMockHandler
        return handler(...args)
      }
      this.mock({ [dependency]: func })
      return {
        ...spies,
        [dependency]: spy,
      }
    }, {})
  }

  mock(dependencies) {
    if (!testing) {
      throw new Error('Dependor _mock should only be used in testing')
    }
    Object.keys(dependencies).forEach(key => {
      if (!this[key]) {
        throw new Error(`Cant mock dependency ${key}. Dont exists`)
      }
      this[key] = dependencies[key]
    })
  }

  reset(keys) {
    if (!testing) {
      throw new Error('Dependor _reset should only be used in testing')
    }
    const originalDependenciesKey = getKey('dependencies')
    const originalDependencies = this[originalDependenciesKey]
    if (!keys) {
      return Object.keys(originalDependencies).forEach(key => {
        this[key] = originalDependencies[key]
      })
    }

    if (Array.isArray(keys)) {
      return keys.forEach(key => {
        if (!this[key]) {
          throw new Error(`Cant reset dependency ${key}. Dont exists`)
        }
        this[key] = originalDependencies[key]
      })
    }

    if (!this[keys]) {
      throw new Error(`Cant mock dependency ${keys}. Dont exists`)
    }
    this[keys] = originalDependencies[keys]
    return this[keys]
  }
}

module.exports = {
  createFreezeFunction,
  Dependor: testing ? TestDependor : Dependor,
  PRIVATE_NAMESPACE,
}
