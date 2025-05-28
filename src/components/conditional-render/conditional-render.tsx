import { FC } from "react";

type ConditionalRenderProps = {
  conditional: boolean;
  children: React.ReactNode;
};

export const ConditionalRender: FC<ConditionalRenderProps> = ({
  conditional,
  children,
}) => {
  return conditional ? children : null;
};
