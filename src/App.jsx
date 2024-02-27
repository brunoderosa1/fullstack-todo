import { Routes, Route } from "react-router-dom";
import ToastManagerLayout from "./layouts/ToastManagerLayout";
import TodosListPage from "./features/todo/components/TodosList";

function App() {
    return (
        <>
            <TodosListPage />
        </>
    );
}

export default App;
