import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>

      <input
        {...props}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
