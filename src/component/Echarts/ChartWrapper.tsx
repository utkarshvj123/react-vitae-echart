import { type PropsWithChildren, type JSX } from "react";

interface ChartWrapperProps {
  title?: string;
}

function ChartWrapper({
  children,
}: PropsWithChildren<ChartWrapperProps>): JSX.Element {
  return (
    <div className="mb-3">
      <div>{children}</div>
    </div>
  );
}

export default ChartWrapper;
