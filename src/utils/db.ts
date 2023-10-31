import { MongoClient } from 'mongodb';

const connectToDataBase = async () => {
  // connect to database
  const client = await MongoClient.connect(
    'mongodb+srv://marosdaniel:OZn3N2zs3JsxIqKg@cluster0.attkgqe.mongodb.net/cookbook?retryWrites=true&w=majority',
  );
  // select database
  return client;
};

export default connectToDataBase;
