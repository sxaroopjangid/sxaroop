// server.js
require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const cors       = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 1. MongoDB connect (only ONCE)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('DB Error:', err));

// 2. Schemas
const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const FormData = mongoose.model("formdatas", formSchema);

// 3. Routes
app.post("/submit", async (req, res) => {
  const formData = new FormData({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });
  await formData.save();
  res.send("Form data saved successfully!");
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) return res.json({ success: true, message: 'Login successful' });
  return res.status(401).json({ error: 'Invalid credentials' });
});

// 4. Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
