import { JSX, ReactElement } from "react";
interface Props {
  headerTitle: string;
}
export const NavWellcome = ({ headerTitle }: Props): ReactElement => {
  const isWellcome = headerTitle === "HomePage";

  const content = (): JSX.Element => {
    return <div className={`header-wellcome`} title="header-wellcome"></div>;
  };

  return <>{isWellcome ? content() : ""}</>;
};
