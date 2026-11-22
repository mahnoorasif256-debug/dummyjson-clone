import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URI;
const  client = new MongoClient(uri);

const connectdb = async () =>{
    await client.connect();

console.log('connection for database');
const database = client.db('dummyjson')

return database;

}


export default connectdb;