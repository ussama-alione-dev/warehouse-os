import { loginSchema, type LoginInput } from "@/schemas/login.schema";

export function validateLoginInput(input: unknown) {
    return loginSchema.safeParse(input);
}

export type { LoginInput };
