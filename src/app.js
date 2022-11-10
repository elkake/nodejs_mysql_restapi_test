import express from 'express'
import employeesRoutes from './routes/employes.routes.js'
import indexRoutes from './routes/index.routes.js'


const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api', employeesRoutes)

app.use((req, res) => {
  res.status(404).json({
    messsage: 'endpoint not found'
  })
})

export default app;