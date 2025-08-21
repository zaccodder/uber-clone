import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const body = await request.json();
    const { name, email, clerkId } = body;

    if (!email || !name || !clerkId) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    const user =
      await sql`INSERT INTO users (email, name, clerk_id) VALUES (${email}, ${name}, ${clerkId}) RETURNING *`;
    return Response.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
