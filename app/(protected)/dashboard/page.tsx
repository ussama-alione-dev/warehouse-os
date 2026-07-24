import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <section className="mx-auto max-w-5xl p-8">
      <h2 className="mb-6 text-3xl font-bold">Welcome 👋</h2>

      <div className="rounded-xl bg-white p-6 shadow">
        <p>
          <strong>Name:</strong> {session?.user?.name}
        </p>

        <p>
          <strong>Email:</strong> {session?.user?.email}
        </p>

        <p>
          <strong>User ID:</strong> {session?.user?.id}
        </p>

        <p>
          <strong>Login Date:</strong> {new Date().toLocaleString()}
        </p>
      </div>
    </section>
  );
}
