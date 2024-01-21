import clsx from "clsx";
import { TextField as RATextfield, type TextFieldProps as FieldProps } from "react-aria-components";

export type LegendProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>;

export const Legend: React.FC<LegendProps> = ({ children, className, ...props }) => (
  <legend
    className={clsx(
      "dark:text-white text-base/6 font-semibold text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6",
      className,
    )}
    data-slot="legend"
    {...props}
  >
    {children}
  </legend>
);

export const Field: React.FC<FieldProps> = ({ children, className, ...props }) => (
  <RATextfield
    className={clsx(
      "[&>[data-slot=control]+[data-slot=description]]:mt-3 [&>[data-slot=control]+[data-slot=error]]:mt-3 [&>[data-slot=description]+[data-slot=control]]:mt-3 [&>[data-slot=label]+[data-slot=control]]:mt-3 [&>[data-slot=label]+[data-slot=description]]:mt-1 [&>[data-slot=label]]:font-medium",
      className,
    )}
    data-slot="field"
    {...props}
  >
    {children}
  </RATextfield>
);
