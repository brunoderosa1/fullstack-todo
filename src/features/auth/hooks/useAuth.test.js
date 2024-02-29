import { useAuth } from "./useAuth";
import { renderHook } from "@testing-library/react-hooks";

describe("useAuth", () => {
    it("should return null currentUser and true loading on initial render", () => {
        const { result } = renderHook(() => useAuth());

        expect(result.current.currentUser).toBeNull();
        expect(result.current.loading).toBe(true);
    });

    it("should update currentUser when auth state changes", async () => {
        const mockUser = { uid: "123" };
        jest.spyOn(auth, "onAuthStateChanged").mockImplementationOnce(
            (callback) => {
                callback(mockUser);
                return () => {};
            }
        );

        const { result, waitForNextUpdate } = renderHook(() => useAuth());

        await waitForNextUpdate();

        expect(result.current.currentUser).toEqual(mockUser);
    });

    it("should login with valid credentials", async () => {
        const mockUser = { uid: "123" };
        jest.spyOn(auth, "signInWithEmailAndPassword").mockResolvedValueOnce(
            mockUser
        );

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            await result.current.login("test@test.com", "password");
        });

        expect(result.current.currentUser).toEqual(mockUser);
    });

    it("should fail to login with invalid credentials", async () => {
        jest.spyOn(auth, "signInWithEmailAndPassword").mockRejectedValueOnce(
            new Error("Invalid credentials")
        );

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            await result.current.login("test@test.com", "wrongpassword");
        });

        expect(result.current.currentUser).toBeNull();
    });

    it("should logout user", async () => {
        jest.spyOn(auth, "signOut").mockResolvedValueOnce();

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            await result.current.logout();
        });

        expect(result.current.currentUser).toBeNull();
    });
});
