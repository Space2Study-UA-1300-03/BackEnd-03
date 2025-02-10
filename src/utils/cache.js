import NodeCache from 'node-cache'

export const cache = new NodeCache({ stdTTL: 24 * 60 * 60, checkperiod: 60 * 60 })

export default cache
