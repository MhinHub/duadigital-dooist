import ToDoList from "@/components/TodoList";
import { NextSeo } from "next-seo";

export default function ToDoListPage() {
  return (
    <>
      <NextSeo title="Todo List | Dooit" description="Your todo list" />
      <ToDoList />
    </>
  );
}
