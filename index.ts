import express from "express";
import { IVault, Vault } from "./data/models";
import { Populated, Select } from "./data/mongoose";
import { routes } from "./routes";
const compression = require('compression');
// const env = process.env.NODE_ENV || 'development';
const pkg = require('./package.json');
const config = require('./config');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const uWS = require('uWebSockets.js');

const app = express();
const PORT = 3000;
const DEV = true;

app.use(express.json());

app.use(
  compression({
    threshold: 512
  })
);

const env = require('./config');
// import env from './config';

console.log(env);

// expose package.json to APIs
app.use(function (req, res, next) {
  res.locals.pkg = pkg;
  res.locals.env = env;
  next();
});

// app.use(express.urlencoded());
app.disable('x-powered-by');

// const join = require('path').join;
// const models = join(__dirname, 'app/models');

// const fs = require('fs');
// fs.readdirSync(models)
//   .filter(file => ~file.search(/^[^.].*\.js$/))
//   .forEach(file => require(join(models, file)));

// A way to show custom headers, we won't expose it for security reasons.
// function customHeaders(req: any, res: any, next: any) {
//   app.disable('x-powered-by');
//   res.setHeader('X-Powered-By', 'Blockcore Vault v0.0.1');
//   next();
// }

// app.use(customHeaders);

if (env === 'development') {
  app.locals.pretty = true;
}

// Is this needed?
mongoose.Promise = global.Promise;

// mongoose.set('toObject', {
//   virtuals: true,
//   transform: (doc: any, converted: { id: any, _id: any; }) => {
//     converted._id = converted.id;
//     delete converted.id;
//   }
// });

mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc: any, converted: { id: any, _id: any; }) => {
    delete converted._id;
  }
});

mongoose
  .connect(config.db,
    {
      autoIndex: DEV,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  .then(async () => {
    console.log("Connected to DB");
    await seed();
    await main();
  })
  .catch((err: any) => console.error("Error connecting to DB: ", err))

routes.forEach((route) => {
  const { method, path, middleware, handler } = route;
  app[method](path, ...middleware, handler);
});

app.listen(PORT, () => {
  console.log(`Blockcore Vault @ http://localhost:${PORT}`);
});

// an "app" is much like Express.js apps with URL routes,
// here we handle WebSocket traffic on the wildcard "/*" route
const app2 = uWS.App().ws('/*', {  // handle messages from client

  open: (socket: { subscribe: (arg0: string) => void; }, req: any) => {
    /* For now we only have one canvas */
    socket.subscribe("drawing/canvas1");
  },
  message: (socket: any, message: any, isBinary: any) => {
    /* In this simplified example we only have drawing commands */
    app2.publish("drawing/canvas1", message, true);
  }
});

// finally listen using the app on port 9001
app2.listen(9001, (listenSocket: any) => {
  if (listenSocket) {
    console.log('Listening to port 9001');
  }
});

async function seed() {
  // First delete all vaults 
  await Vault.deleteMany({})

  // Create two users
  const smith = await Vault.create({
    id: 'did:is:test1',
    name: 'TEST1',
    url: 'http://localhost',
    created: new Date()
  })

  const adam = await Vault.create({
    id: 'did:is:test2',
    name: 'TEST2',
    url: 'http://localhost',
    created: new Date()
    // friends: [smith.id],
    // boss: smith.id
  })
}

async function main() {
  // Simple query
  const adam =
    await Vault.findOne({ name: 'TEST1' })

  // Populate
  // const adamPopulated =
  //   await Vault.findOne({ email: 'adam@email.com' })
  //     .populate('friends')
  //     .populate('boss') as Populated<IVault, 'friends' | 'boss'>

  // Lean
  const adamLean =
    await Vault.findOne({ email: 'adam@email.com' })
      .lean()

  // Select
  // const adamSelect =
  //   await Vault.findOne({ email: 'adam@email.com' })
  //     .select('friends') as Select<IVault, 'friends'>

  // Instance methods
  const smith = await Vault.findOne({ email: 'smith@email.com' })
  // const smithsEmployees = await smith.getEmployees()

  // Statics
  // const usersYoungerThan23 = await Vault.findYoungerThan(23)
}