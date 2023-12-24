import { useRouter } from "next/navigation";
import Link from "next/link";

const ToDoCard = ({
  id,
  title,
  label,
}: {
  id: string;
  title: string;
  label: string;
}) => {
  return (
    <Link
      className={`${
        label === "Finance"
          ? "bg-[#F3E4F6]"
          : label === "Other"
            ? "bg-[#E5FFE6]"
            : label === "Personal"
              ? "bg-[#FFF6E7]"
              : "bg-[#1919]"
      } flex w-full flex-col justify-start rounded-2xl p-4 ring-current ring-opacity-20 duration-1000 ease-out animate-in fade-in-80 hover:ring-1`}
      href={`/todo-list?id=${id}`}
    >
      <p className="line-clamp-1 w-full text-start text-xl">
        {title || "New Todos"}
      </p>
      <p className="mt-4 w-fit rounded-full bg-black px-2 py-1 text-xs text-white">
        {label || "No Label"}
      </p>
    </Link>
  );
};

export default ToDoCard;
