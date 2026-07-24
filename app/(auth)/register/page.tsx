import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold">WarehouseOS</h1>

        <RegisterForm />
      </div>
    </main>
  );
}
