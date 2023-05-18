
import { FC, ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  tooltip?: string;
}

const ToolTip: FC<Props> = ({ children, tooltip }): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left + "px";
      }}
      className="relative inline-block group"
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="absolute invisible p-1 mt-2 text-white transition bg-blue-500 rounded opacity-0 group-hover:visible group-hover:opacity-100 top-full whitespace-nowrap"
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

export default ToolTip;