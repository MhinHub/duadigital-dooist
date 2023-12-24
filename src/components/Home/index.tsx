import Image from "next/image";
import { useRouter } from "next/navigation";
import { DataTodos, useTodosStore } from "@/stores";
import { uuid } from "uuidv4";
import TodoCard from "./TodoCard";
import { useEffect } from "react";

import Header from "@/components/Header";

import plus from "@/assets/plus.svg";

const Home = () => {
  const { push } = useRouter();
  const { allTodos, updateAllTodos } = useTodosStore();

  function filterCompletedTodosGroups(groups: DataTodos[]) {
    if (!groups) {
      return;
    }

    const newTodos = groups
      .map((group) => {
        const incompleteTodos = group.todos.filter((todo) => !todo.isDone);
        return { ...group, todos: incompleteTodos };
      })
      .filter((group) => group.todos.length > 0);

    return updateAllTodos(newTodos);
  }

  useEffect(() => {
    filterCompletedTodosGroups(allTodos);
  }, []);

  return (
    <>
      <Header />
      <section className="relative h-screen">
        {allTodos?.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Image
              src="/assets/Home.svg"
              height={227}
              width={430}
              alt="home-illustration"
              priority
            />
            <div className="mt-6 flex flex-col items-center justify-center">
              <p className="text-lg font-normal">
                Create your first to-do list...
              </p>
              <button
                onClick={() => push(`/todo-list?id=${uuid()}`)}
                className="mt-8 flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 text-white"
              >
                <Image src={plus} alt="plus-icon" />
                <span className="text-sm font-light">New List</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-4 pt-20 md:mx-20">
            <div className="grid gap-4 md:grid-cols-4">
              {allTodos?.map((val) => {
                return (
                  <TodoCard
                    key={val.id}
                    id={val.id}
                    title={val.title}
                    label={val.label}
                  />
                );
              })}
            </div>
            <button
              onClick={() => push(`/todo-list?id=${uuid()}`)}
              className="fixed bottom-8 right-8 z-10 rounded-full bg-black p-6 duration-700 ease-out animate-in slide-in-from-right-96"
            >
              <Image src={plus} alt="plus-icon" className="w-6" priority />
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
