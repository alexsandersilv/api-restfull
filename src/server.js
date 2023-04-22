require('express-async-errors');

const AppError = require('./utils/AppError');

require('./database/sqlite/migrations')();

const express = require('express');
const routes = require('./routes');
const uploadConfig = require('./configs/upload');

const app = express();

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))
app.use(express.json());
app.use(routes);
app.use((error, req, res, next) => {
  const isClientError = error instanceof AppError;

  if(isClientError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.log(error.message);
  
  return res.status(500).json({ message: 'Internal Server Error' });
})

const PORT = 3000;


app.listen(PORT,() => console.log(`[server] listening on ${PORT}`, `http://localhost:${PORT}`));