import { Header } from "@tanstack/react-table";

export const ColumnResizer = <TData,>({
  header,
}: {
  header: Header<TData, unknown>;
}) => {
  if (header.column.getCanResize() === false) return <></>;

  return (
    <div
      {...{
        onMouseDown: header.getResizeHandler(),
        onTouchStart: header.getResizeHandler(),
        className: `absolute top-0 right-0 cursor-col-resize w-px h-full bg-secondary hover:bg-secondary hover:w-2`,
        style: {
          userSelect: "none",
          touchAction: "none",
        },
      }}
    />
  );
};
