import { Todos, useTodosStore } from "@/stores";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import LabelBadge from "./LabelBadge";
import Image from "next/image";

import arrowLeft from "@/assets/arrow-left.svg";
import box from "@/assets/box.svg";
import boxCheck from "@/assets/box-check.svg";
import plusBlack from "@/assets/plus-black.svg";

const LabelList = ["Personal", "Work", "Finance", "Other"];

const ToDoList = () => {
  const { back } = useRouter();
  const groupId = useSearchParams().get("id");

  const [editedTitle, setEditedTitle] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [editingId, setEditingId] = useState<string>("");
  const [todoInput, setTodoInput] = useState<string>("");
  const [todoItem, setTodoItem] = useState<Todos[]>([]);

  const { allTodos, updateAllTodos } = useTodosStore();

  const handleTitleChange = (id: string, val: string) => {
    const newAllTodos = [...allTodos];

    const editedIndex = newAllTodos.findIndex((val) => val.id === id);
    newAllTodos[editedIndex] = {
      ...newAllTodos[editedIndex],
      title: val,
    };

    setEditedTitle(val);
    updateAllTodos(newAllTodos);
  };

  const handleLabelChange = (id: string, val: string) => {
    const newAllTodos = [...allTodos];

    const editedIndex = newAllTodos.findIndex((val) => val.id === id);
    newAllTodos[editedIndex] = {
      ...newAllTodos[editedIndex],
      label: val,
    };

    setSelectedLabel(val);
    updateAllTodos(newAllTodos);
  };

  const handleTodosChange = (groudId: string, todosId: string) => {
    const newGroupAllTodos = [...allTodos];

    const editedGroupIndex = newGroupAllTodos.findIndex(
      (val) => val.id === groudId,
    );
    const editedTodosIndex = newGroupAllTodos[editedGroupIndex].todos.findIndex(
      (val) => val.id === todosId,
    );
    const newTodos = [...allTodos[editedGroupIndex].todos];
    newGroupAllTodos[editedGroupIndex].todos[editedTodosIndex] = {
      ...newTodos[editedTodosIndex],
      task: todoInput,
    };

    updateAllTodos(newGroupAllTodos);
    setEditingId("");
    setTodoInput("");
  };

  const handleTodosCheckChange = (groudId: string, todosId: string) => {
    const newGroupAllTodos = [...allTodos];

    const editedGroupIndex = newGroupAllTodos.findIndex(
      (val) => val.id === groudId,
    );
    const editedTodosIndex = newGroupAllTodos[editedGroupIndex].todos.findIndex(
      (val) => val.id === todosId,
    );
    const newTodos = [...allTodos[editedGroupIndex].todos];
    newGroupAllTodos[editedGroupIndex].todos[editedTodosIndex] = {
      ...newTodos[editedTodosIndex],
      isDone:
        !newGroupAllTodos[editedGroupIndex].todos[editedTodosIndex].isDone,
    };

    updateAllTodos(newGroupAllTodos);
    setEditingId("");
    setTodoInput("");
  };

  const onNewTodos = () => {
    const newTodos = [...allTodos];
    const selectedTodos = newTodos.findIndex((val) => {
      return val.id === groupId;
    });
    console.log(selectedTodos);
    const id = uuid();
    newTodos[selectedTodos].todos.push({
      id,
      task: "",
      isDone: false,
    });

    setEditingId(id);
    updateAllTodos(newTodos);
  };

  useEffect(() => {
    const selectedTodos = allTodos.filter((val) => {
      return val.id === groupId;
    });
    if (selectedTodos.length !== 0) {
      setEditedTitle(selectedTodos[0].title);
      setSelectedLabel(selectedTodos[0].label);
      setTodoItem(selectedTodos[0]?.todos);
    } else {
      const newDataTodos = [...allTodos];
      newDataTodos.push({
        id: groupId || "",
        title: "",
        label: "",
        todos: [],
      });
      updateAllTodos(newDataTodos);
    }
  }, [allTodos, groupId]);

  return (
    <section className="flex h-screen flex-col justify-between">
      <div className="flex flex-col">
        <button
          onClick={() => back()}
          className="animate-in fade-in-10 m-4 text-2xl font-bold duration-700"
        >
          <Image src={arrowLeft} alt="back" priority />
        </button>
        <div className="md:mx-auto">
          <input
            className="animate-in fade-in-5 ml-5 mt-5 text-2xl font-medium outline-none duration-200 placeholder:text-black"
            placeholder="Title"
            onBlur={(e) => handleTitleChange(groupId || "", e.target.value)}
            defaultValue={editedTitle}
          />
          <div className="max-h-[32rem]">
            {todoItem?.length === 0 ? null : (
              <div className="space-y-4">
                {todoItem?.map((val: Todos) => {
                  return (
                    <div
                      key={val.id}
                      className="animate-in slide-in-from-bottom-10 fade-in-0 ml-5 mr-2 mt-5 flex items-center space-x-3"
                    >
                      <button
                        onClick={() =>
                          handleTodosCheckChange(groupId || "", val.id)
                        }
                      >
                        {val.isDone ? (
                          <Image
                            src={boxCheck}
                            alt="box-check"
                            className="animate-in slide-in-from-bottom-10"
                          />
                        ) : (
                          <Image
                            src={box}
                            alt="box"
                            className="animate-in slide-in-from-bottom-10"
                          />
                        )}
                      </button>
                      {editingId === val.id ? (
                        <input
                          className={`w-full text-base font-light tracking-normal outline-none`}
                          autoFocus
                          placeholder="Add Todo"
                          defaultValue={val.task}
                          onChange={(e) => setTodoInput(e.target.value)}
                          onBlur={() =>
                            handleTodosChange(groupId || "", val.id)
                          }
                          type="text"
                        />
                      ) : (
                        <div
                          className={`w-full text-base font-light tracking-normal hover:bg-gray-100 ${
                            val.task ? "text-black" : "text-gray-300"
                          }
                        } ${val.isDone ? "line-through" : ""}`}
                          onClick={() => {
                            setEditingId(val.id);
                            setTodoInput(val.task);
                          }}
                        >
                          {val.task || "New task"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <button
              onClick={() => onNewTodos()}
              className="ml-5 mt-5 flex items-center space-x-3"
            >
              <Image src={plusBlack} alt="plus" />
              <p className="bg-transparent text-sm opacity-30">To-do</p>
            </button>
          </div>
        </div>
      </div>
      <div className="mx-4 mb-5 border-t-2">
        <h3 className="md:text-center my-6 mb-4 text-xl">Choose a label</h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {LabelList.map((val, idx) => {
            return (
              <LabelBadge
                key={idx}
                onClick={() => handleLabelChange(groupId || "", val)}
                label={val}
                selectedLabel={selectedLabel}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToDoList;
