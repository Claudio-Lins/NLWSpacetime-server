import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRoute } from './routes/memories'
import { authRoute } from './routes/auth'
import { uploadRoute } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()
app.register(multipart)
app.register(memoriesRoute)
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(uploadRoute)
app.register(authRoute)
app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime',
})

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('Server is listening on port 3333')
  })
