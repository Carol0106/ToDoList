const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Import routes
const tasksRouter = require('./Routes/taskRoutes');
app.use('/api/tasks', tasksRouter);

const contactRoutes = require('./Routes/contactRoutes');
app.use('/api/contact', contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
