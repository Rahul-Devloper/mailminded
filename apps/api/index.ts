import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.js';

dotenv.config();

const connectionString = process.env.DATABASE_URL!;
console.log('Using database connection string:', connectionString);

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'mailminded-api' });
});

// Create test record
app.post('/test', async (req, res) => {
  try {
    const { message } = req.body as { message?: string };

    if (!message) {
      return res
        .status(400)
        .json({ success: false, error: 'message is required' });
    }

    const record = await prisma.test.create({
      data: { message },
    });

    res.json({ success: true, record });
  } catch (error) {
    console.error('POST /test error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Get all test records
app.get('/test', async (_req, res) => {
  try {
    const records = await prisma.test.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(records);
  } catch (error) {
    console.error('GET /test error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Mailminded API listening on port ${PORT}`);
});
