import { Label as RALabel, type LabelProps } from "react-aria-components";

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <RALabel
      className="dark:text-white select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6"
      data-slot="label"
      {...props}
    >
      {children}
    </RALabel>
  );
};
