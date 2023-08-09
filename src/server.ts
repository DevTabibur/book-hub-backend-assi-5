import app from './app'
import config from './app/config/config'
const PORT = config.port || 5000

const startServer = async (): Promise<void> => {
  try {
    app.listen(PORT, () => {
      console.log(`🌐 Server started on port ${PORT}`)
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message)
  }
}

startServer()
