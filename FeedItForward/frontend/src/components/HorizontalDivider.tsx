interface HorizontalDividerProps {
  label?: string;
  className?: string;
}

export const HorizontalDivider = (props: HorizontalDividerProps) => {
  const { label, className } = props;

  return (
    <div className={"relative flex flex-col w-full " + className}>
      <hr className={`border-gray-500 ${label ? "translate-y-3" : "my-2"}`} />
      <span className="bg-white z-10 self-center px-2 text-gray-500 font-bold">
        {label}
      </span>
    </div>
  );
};
