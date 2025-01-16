const router = require('express').Router()

router.get('/', (_req, res) => {
  res.send({ message: 'pong' })
})

module.exports = router
