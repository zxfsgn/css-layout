const express = require('express')
const config = require('config')
const mongoose = require("mongoose");
const { Code } = require('mongodb');

const app = express()

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api/auth', require('./routes/authRouter'))
app.use('/api/products', require('./routes/productRouter'))

app.use(express.static(__dirname))

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"),
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      });
  } catch (e) {
    console.log('Server Error', e.massage)
    process.exit(1)
  }
}
start()

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})


