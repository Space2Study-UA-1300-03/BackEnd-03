/**
 * @description Checking if jest integration tests are working
 */

import { describe, expect, it, beforeAll, afterAll, afterEach } from '@jest/globals'
import { connect, clearDatabase, closeDatabase } from '#src/test/dbHandler.js'
import { ping } from '#src/controllers/ping.js'

describe('Ping Controller', () => {
  let app
  let server

  beforeAll(async () => {
    const { app: appInstance, server: serverInstance } = await connect()
    app = appInstance
    server = serverInstance
  })

  afterEach(async () => {
    await clearDatabase()
  })

  afterAll(async () => {
    await closeDatabase(server)
  })

  describe('GET /ping', () => {
    it('should respond with status 200', async () => {
      const response = await app.get('/ping', ping)

      expect(response.status).toBe(200)
    })
    it('should respond with body { message: "pong" }', async () => {
      const response = await app.get('/ping', ping)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'pong' })
    })
  })
})
