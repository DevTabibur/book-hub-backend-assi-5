import mongoose from 'mongoose'
import config from '../config/config'

const dbConnect = async (): Promise<void> => {
  try {
    if (!config.database_string) {
      console.log(`No URI found in .env file`)
      process.exit(1)
    }
    await mongoose.connect(config.database_string as string)
    console.log(`🌧 Database is connected successfully 🌧`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message)
  }
}

export default dbConnect
