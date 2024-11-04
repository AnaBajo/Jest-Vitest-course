import "@testing-library/jest-dom";

// vitest.setup.js
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/server'

// establishing API mocking
beforeAll(() => server.listen())

// reset handlers we may add between tests so they don't disrupt other tests
afterEach(() => server.resetHandlers())

// shuts down server cleanly after all tests
afterAll(() => server.close())