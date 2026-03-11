import { useEffect, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/redux/hooks/hooks";

type Props = {
  children: ReactElement;
};

const CheckOutSecurity = ({ children }: Props) => {
  const { logged, id } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect((): void => {
    if (logged && id) {
      navigate("/penguins");
    }
  }, [logged, navigate, id]);

  if (!logged) {
    return children;
  } else {
    return null;
  }
};

export default CheckOutSecurity;
