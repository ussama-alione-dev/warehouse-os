import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegisterForm from "@/components/RegisterForm";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));

describe("RegisterForm", () => {
    beforeEach(() => {
        pushMock.mockClear();
        jest.restoreAllMocks();
    });

    it("submits valid data and redirects to the login page", async () => {
        const fetchMock = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ success: true }),
        });

        Object.defineProperty(globalThis, "fetch", {
            configurable: true,
            value: fetchMock,
        });

        render(<RegisterForm />);

        fireEvent.change(screen.getByLabelText(/full name/i), {
            target: { value: "Jane Doe" },
        });

        fireEvent.change(screen.getByLabelText(/^email$/i), {
            target: { value: "jane@example.com" },
        });

        fireEvent.change(screen.getByLabelText(/^password$/i), {
            target: { value: "password123" },
        });

        fireEvent.change(screen.getByLabelText(/confirm password/i), {
            target: { value: "password123" },
        });

        fireEvent.click(
            screen.getByRole("button", { name: /create account/i }),
        );

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledWith(
                "/api/register",
                expect.objectContaining({
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: "Jane Doe",
                        email: "jane@example.com",
                        password: "password123",
                        confirmPassword: "password123",
                    }),
                }),
            );
        });

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/login");
        });
    });
});
