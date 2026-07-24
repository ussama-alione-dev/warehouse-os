import { validateLoginInput } from "@/lib/validation";

describe("validateLoginInput", () => {
    it("rejects an invalid email and short password", () => {
        const result = validateLoginInput({
            email: "not-an-email",
            password: "short",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.email).toContain(
                "Invalid email address",
            );
            expect(result.error.flatten().fieldErrors.password).toContain(
                "Password must contain at least 8 characters",
            );
        }
    });

    it("accepts valid credentials", () => {
        const result = validateLoginInput({
            email: "jane@example.com",
            password: "password123",
        });

        expect(result.success).toBe(true);
    });
});
