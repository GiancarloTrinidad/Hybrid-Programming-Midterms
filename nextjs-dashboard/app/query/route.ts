import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

async function listStudents() {
	const data = await sql`
    SELECT * from students
  `;

	return data;
}

export async function GET() {
  try {
  	return Response.json(await listStudents());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
