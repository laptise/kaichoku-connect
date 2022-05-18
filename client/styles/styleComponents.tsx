import { CSSProperties } from "react";

export namespace CommonProps {
  export const verticalFlex: CSSProperties = {
    flexDirection: "column",
    display: "flex",
  };
  export const flexAllCenter: CSSProperties = {
    alignItems: "center",
    justifyContent: "center",
  };
}
