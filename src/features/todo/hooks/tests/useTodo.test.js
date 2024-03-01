import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from 'vitest'

import useTodo from "../useTodo";
import getAllTodos from "../../services/getAllTodos";
import createTodo from "../../services/createTodo";

describe("useTodo", () => {
    it("should initialize with empty todos array and loading true", () => {
        const { result } = renderHook(() => useTodo());
        expect(result.current.todos).toEqual([]);
        expect(result.current.loading).toBe(true);
    });

    it("should fetch todos and set loading false on mount", async () => {
        vi.getAllTodos.mockReturnValueOnce([
            { id: 1, title: "Todo 1" },
        ]);

        const { result, waitForNextUpdate } = renderHook(() => useTodo());

        await waitForNextUpdate();

        expect(result.current.todos).toEqual([{ id: 1, title: "Todo 1" }]);
        expect(result.current.loading).toBe(false);
    });

    it("should handle error fetching todos", async () => {
        getAllTodos.mockRejectedValueOnce(
            new Error("Failed to fetch")
        );

        const { result, waitForNextUpdate } = renderHook(() => useTodo());

        await waitForNextUpdate();

        expect(result.current.error).toEqual(new Error("Failed to fetch"));
    });

    it("should create new todo", async () => {
        createTodo.mockResolvedValueOnce({
            id: 1,
            title: "New Todo",
        });

        const { result } = renderHook(() => useTodo());

        await act(async () => {
            await result.current.createTodoFn({ title: "New Todo" });
        });

        expect(result.current.todos).toEqual([{ id: 1, title: "New Todo" }]);
    });

    // Add tests for deleteTodoFn and updateTodoFn
});
