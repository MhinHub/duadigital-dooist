import ToDoList from "@/components/TodoList";
import { NextSeo } from "next-seo";

export default function ToDoListPage() {
  return (
    <div className="duration-700 ease-in-out animate-in slide-in-from-right-10">
      <NextSeo title="Todo List | Dooist" description="Your todo list" />
      <ToDoList />
    </div>
  );
}
