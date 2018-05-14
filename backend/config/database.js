/*
use blog
db.createUser(
   {
     user: "root",
     pwd: "toor",
     roles:
       [
         { role: "readWrite", db: "blog" }
       ]
   }
)
*/

const host = 'ds219040.mlab.com';
const port = 19040;
const user = 'pewterschmidt';
const password = '12345678';
const database = 'pewterschmidt';

module.exports = {
  uri: `mongodb://${user}:${password}@${host}:${port}/${database}`,
  options: {
    connectTimeoutMS: 5000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    useMongoClient: true,
  },
};
