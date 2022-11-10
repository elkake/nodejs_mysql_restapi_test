import { PORT } from './config.js'
import app from './app.js'

app.listen(PORT)
console.log(`Se inicio la conexcio con el puerto ${PORT}`)
