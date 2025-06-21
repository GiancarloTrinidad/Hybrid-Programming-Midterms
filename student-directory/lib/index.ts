import { Client } from 'pg';

// Function to create a PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Connect to the database
export const connectDb = async () => {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
};

// Export the client for executing queries
export const query = async (text: string, params?: any[]) => {
  try {
    const res = await client.query(text, params);
    return res;
  } catch (err) {
    console.error('Query error', err);
    throw err;
  }
};

// Close the client connection (optional)
export const closeDb = async () => {
  await client.end();
  console.log('Database connection closed');
};
