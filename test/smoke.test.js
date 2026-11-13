const test = require('node:test')
const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')
const http = require('node:http')

const SRC = path.join(__dirname, '..', 'src')
const dirs = ['models', 'controllers', 'routes']

// Detecta requires rotos tras actualizar dependencias.
for (const dir of dirs) {
  for (const file of fs.readdirSync(path.join(SRC, dir)).filter((f) => f.endsWith('.js'))) {
    test(`carga ${dir}/${file}`, () => {
      assert.doesNotThrow(() => require(path.join(SRC, dir, file)))
    })
  }
}

// Monta todas las rutas en una app Express sin conectar a MongoDB.
test('express monta las rutas y responde 404 en ruta inexistente', async () => {
  const express = require('express')
  const app = express()
  app.use(express.json())
  for (const file of fs.readdirSync(path.join(SRC, 'routes')).filter((f) => f.endsWith('.js'))) {
    app.use('/spi/test', require(path.join(SRC, 'routes', file)))
  }
  app.get('/', (req, res) => res.json('ok'))

  const server = http.createServer(app)
  await new Promise((resolve) => server.listen(0, resolve))
  const { port } = server.address()
  try {
    const ok = await fetch(`http://127.0.0.1:${port}/`)
    assert.strictEqual(ok.status, 200)
    const missing = await fetch(`http://127.0.0.1:${port}/no-existe`)
    assert.strictEqual(missing.status, 404)
  } finally {
    server.close()
  }
})

test('ejs renderiza una plantilla', async () => {
  const ejs = require('ejs')
  assert.strictEqual(await ejs.render('<%= x %>', { x: 'hola' }), 'hola')
})

// Misma config de vistas que src/index.js: res.render('./views/graficar').
test('graficar.ejs se renderiza con la config real de vistas', async () => {
  const express = require('express')
  const app = express()
  app.set('view engine', 'ejs')
  app.set('views', SRC)
  app.get('/g', (req, res) => res.render('./views/graficar', { numbers: '1,2,3', tam: '0,1,2' }))

  const server = http.createServer(app)
  await new Promise((resolve) => server.listen(0, resolve))
  const { port } = server.address()
  try {
    const res = await fetch(`http://127.0.0.1:${port}/g`)
    assert.strictEqual(res.status, 200)
    const html = await res.text()
    assert.match(html, /'1,2,3'/)
    assert.match(html, /'0,1,2'/)
  } finally {
    server.close()
  }
})

// Express 5: req.body es undefined si no hay cuerpo; el endpoint no debe explotar.
test('express.json deja req.body undefined sin cuerpo (Express 5)', async () => {
  const express = require('express')
  const app = express()
  app.use(express.json())
  app.post('/b', (req, res) => res.json({ body: req.body === undefined ? 'undefined' : 'defined' }))

  const server = http.createServer(app)
  await new Promise((resolve) => server.listen(0, resolve))
  const { port } = server.address()
  try {
    const res = await fetch(`http://127.0.0.1:${port}/b`, { method: 'POST' })
    assert.strictEqual((await res.json()).body, 'undefined')
  } finally {
    server.close()
  }
})

// mongoose abre handles al cargar modelos; forzamos salida limpia.
test.after(() => setImmediate(() => process.exit(process.exitCode || 0)))
