import {MouseEventHandler} from "react";

export interface ChildrenProps {
  children?: JSX.Element | JSX.Element[];
}

export interface AdditionalClassNames {
  className?: string;
}

export interface OnClickButton {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}
