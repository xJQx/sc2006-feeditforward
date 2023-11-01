interface SubTitleProps {
  title: string;
  className?: string;
}

export const ScreenSubTitle = (props: SubTitleProps) => {
  const { title, className } = props;

  return (
    <div className={"mt-6 font-bold text-[18px] " + className}>{title}</div>
  );
};
