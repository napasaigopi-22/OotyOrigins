const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://mahesh:maheshaa@cluster0.umn1m4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } catch (e) {
    console.error('Error connecting to MongoDB:', e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
