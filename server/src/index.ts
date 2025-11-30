import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import apiRoutes from './routes/index.js'; 

const app = express();
const PORT = 3001;

//  Middlewares
app.use(cors());
app.use(express.json());

//  Static Files
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

//  API Routes Registration
app.use('/api', apiRoutes);

//  Welcome Route
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; padding: 50px;">
      <h1 style="color: #3A6FF8;">Gstore Career API 🚀</h1>
      <p>Server is running with Modular Architecture</p>
    </div>
  `);
});

//  Server Start
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));