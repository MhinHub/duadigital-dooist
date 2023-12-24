const LabelBadge = ({
  label,
  selectedLabel,
  onClick,
}: {
  label: string;
  selectedLabel: string;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick}>
      <p
        className={`${
          selectedLabel === label ? "bg-black" : "bg-[#919191]"
        } rounded-full px-4 py-1.5 text-xs font-medium text-white transition duration-700 ease-out animate-in slide-in-from-bottom-10`}
      >
        {label}
      </p>
    </button>
  );
};

export default LabelBadge;
