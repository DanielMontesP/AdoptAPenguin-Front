import { ReactElement } from "react";
interface Props {
  headerTitle: string;
}
export const NavWellcome = ({ headerTitle }: Props): ReactElement => {
  const isWellcome = headerTitle === "HomePage";

  const content = () => {
    return (
      <div
        className={`header-wellcome`}
        // placeholder="header-wellcome"
      ></div>
    );
  };

  return <>{isWellcome ? content() : ""}</>;
};
