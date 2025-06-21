import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getStudentById(id: number) {
  const data = await sql`SELECT * FROM students WHERE id = ${id}`;
  return data[0];
}

type Params = {
  params: {
    id: string;
  };
};

export default async function StudentDetailPage({ params }: Params) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return <p>Invalid student ID.</p>;
  }

  let student;

  try {
    student = await getStudentById(id);
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    return <p>Failed to load student.</p>;
  }

  if (!student) {
    return <p>Student not found.</p>;
  }

  return (
    <main>
      <h1>Student Details</h1>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Course:</strong> {student.course}</p>
    </main>
  );
}
