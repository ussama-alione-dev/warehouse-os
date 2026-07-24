import { Session } from "next-auth";
import LogoutButton from "./LogoutButton";

interface HeaderProps {
  session: Session;
}

export default function Header({ session }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">
      <div>
        <h1 className="text-2xl font-bold text-blue-600">WarehouseOS</h1>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="font-semibold">{session.user?.name}</p>

          <p className="text-sm text-slate-500">{session.user?.email}</p>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}
