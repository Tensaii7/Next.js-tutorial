import postgres from 'postgres';

function getSql() {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable is not set');
  }
  return postgres(process.env.POSTGRES_URL, { ssl: 'require' });
}

async function listInvoices() {
	const data = await getSql()`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET() {
  try {
	return Response.json(await listInvoices());
  } catch (error) {
	return Response.json({ error }, { status: 500 });
  }
}
