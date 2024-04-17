import { MongoClient } from 'mongodb'

const uri = 'mongodb://localhost:27017'; 
//process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (!'mongodb://localhost:27017') {
  throw new Error('Add Mongo URI to env file')
}

client = new MongoClient(uri, options)
clientPromise = client.connect()


export default clientPromise