import NodeCache from 'node-cache'

export const cache = new NodeCache({ stdTTL: 24 * 60 * 60, checkperiod: 60 * 60 })

/**
 * Delete all keys with a given prefix.
 * @param {string} prefix - The prefix to match keys.
 */
cache.delByPrefix = (prefix) => {
  const keys = cache.keys()
  const keysToDelete = keys.filter((key) => key.startsWith(prefix))
  keysToDelete.forEach((key) => cache.del(key))
}

export default cache
