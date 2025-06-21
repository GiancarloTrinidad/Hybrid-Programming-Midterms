// lib/createStudentsTable.ts

import { query } from './db';

const createTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      course TEXT NOT NULL
    );
  `;

  try {
    await query(createTableQuery);
    console.log('Students table created or already exists.');
  } catch (err) {
    console.error('Error creating students table:', err);
  }
};

createTable();
