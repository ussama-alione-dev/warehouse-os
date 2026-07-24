import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "@/components/LoginForm";

const pushMock = jest.fn();
const refreshMock = jest.fn();
const signInMock = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock,
        refresh: refreshMock,
    }),
}));

jest.mock("next-auth/react", () => ({
    signIn: (...args: unknown[]) => signInMock(...args),
}));

describe("LoginForm", () => {
    beforeEach(() => {
        pushMock.mockClear();
        refreshMock.mockClear();
        signInMock.mockReset();
    });

    it("logs in and redirects to the dashboard", async () => {
        signInMock.mockResolvedValue({ error: null });

        render(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "jane@example.com" },
        });

        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "password123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(signInMock).toHaveBeenCalledWith("credentials", {
                email: "jane@example.com",
                password: "password123",
                redirect: false,
            });
        });

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/dashboard");
            expect(refreshMock).toHaveBeenCalled();
        });
    });
});
