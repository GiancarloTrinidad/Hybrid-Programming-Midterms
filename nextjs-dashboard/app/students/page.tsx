import postgres from 'postgres';
import Link from 'next/link';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listStudents() {
  const data = await sql`SELECT * FROM students`;
  return data;
}

export default async function StudentsPage() {
  let students;

  try {
    students = await listStudents();
  } catch (error) {
    console.error('Error fetching students:', error);
    return <p>Failed to load students.</p>;
  }

  return (
    <main>
      <h1>All Students</h1>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Course</th></tr>
        </thead>
        <tbody>
          {students.map((student: any) => (
            <tr key={student.id}>
              <td><Link href={`/students/${student.id}`}>{student.name}</Link></td>
              <td>{student.email}</td>
              <td>{student.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
