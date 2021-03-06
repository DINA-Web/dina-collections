const now = require('performance-now')
const objectPath = require('object-path')

const cleanId = id => {
  if (!id) {
    return id
  }

  if (typeof id !== 'string') {
    return id
  }

  return id.replace(/\./, ',')
}

module.exports = function createReporter() {
  const report = {}

  const set = ({ path, value }) => {
    objectPath.set(report, path, value)
  }

  const push = ({ path, value }) => {
    objectPath.push(report, path, value)
  }

  const get = ({ path }) => {
    return objectPath.get(report, path)
  }

  const increment = ({ path, count: incrementCount = 1 }) => {
    let count = get({ path })
    if (count === undefined || count === null) {
      count = incrementCount
    } else {
      count += incrementCount
    }

    set({ path, value: count })
  }

  const getReport = () => {
    return report
  }

  const start = () => {
    const startTime = now()
    set({
      path: 'time.start',
      value: startTime,
    })
  }

  const done = () => {
    const endTime = now()
    set({
      path: 'time.end',
      value: endTime,
    })

    const startTime = get({
      path: 'time.start',
    })

    const totalTime = endTime - startTime

    set({
      path: 'time.total',
      value: `${totalTime} ms`,
    })
  }

  /* rebuildViewSpecific */
  const rebuildViewDependencyReport = ({ dependencyReport }) => {
    set({
      path: 'dependencies',
      value: dependencyReport,
    })
  }

  const rebuildViewLookupMiss = ({ resource, id }) => {
    increment({
      path: `lookups.overview.${resource}.nMisses`,
    })
    if (id !== undefined) {
      increment({
        path: `lookups.details.${resource}.missing.${cleanId(id)}`,
      })
    }
  }

  const rebuildViewLookupHit = ({ resource, id }) => {
    increment({
      path: `lookups.overview.${resource}.nHits`,
    })
    if (id !== undefined) {
      increment({
        path: `lookups.details.${resource}.hits.${cleanId(id)}`,
      })
    }
  }

  const rebuildViewError = ({ index, err }) => {
    increment({
      path: 'transformation.overview.errors',
    })

    if (index !== undefined) {
      push({
        path: 'transformation.details.indexWithErrors',
        value: index,
      })
    }
    if (err !== undefined && err.message) {
      increment({
        path: `transformation.details.errorMessages.${
          err.scope ? `${err.scope}.` : ''
        }${err.message}`,
      })
    }
  }

  const rebuildViewValidationError = ({ id, index }) => {
    increment({
      path: 'transformation.overview.validationErrors',
    })

    if (id !== undefined) {
      push({
        path: 'transformation.details.idsWithValidationErrors',
        value: id,
      })
    } else if (index !== undefined) {
      push({
        path: 'transformation.details.indexWithValidationErrors',
        value: index,
      })
    }
  }

  const rebuildViewIncrementSrc = ({ items }) => {
    const count = items ? items.length : 1
    increment({
      count,
      path: 'transformation.overview.nSrcItems',
    })
  }

  const rebuildViewIncrementTarget = ({ items }) => {
    const count = items ? items.length : 1
    increment({
      count,
      path: 'transformation.overview.nTargetItems',
    })
  }

  const rebuildViewIncrementCustom = ({ items, scope }) => {
    const count = items ? items.length : 1
    increment({
      count,
      path: `transformation.overview.${scope}`,
    })
  }

  const rebuildViewIncrementNotMigratedPaths = ({ src, paths = [] }) => {
    paths.forEach(path => {
      if (path) {
        increment({
          path: `transformation.notMigrated.${path}`,
        })
      }
    })
    if (src) {
      paths.forEach(path => {
        if (path) {
          set({
            path: `transformation.notMigratedExample.${path}`,
            value: objectPath.get(src, path),
          })
        }
      })
    }
  }

  return {
    done,
    getReport,
    increment,
    push,
    rebuildViewDependencyReport,
    rebuildViewError,
    rebuildViewIncrementCustom,
    rebuildViewIncrementNotMigratedPaths,
    rebuildViewIncrementSrc,
    rebuildViewIncrementTarget,
    rebuildViewLookupHit,
    rebuildViewLookupMiss,
    rebuildViewValidationError,
    start,
  }
}
