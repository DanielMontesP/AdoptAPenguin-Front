import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { resetMessagesThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import { resetPenguinsThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";

type Props = {
  children: JSX.Element;
};

const CheckInSecurity = ({ children }: Props) => {
  const { id, logged } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!logged || !id) {
      navigate("/login");
      dispatch(resetMessagesThunk);
      dispatch(resetPenguinsThunk);
    }
  }, [dispatch, logged, navigate, id]);

  if (logged) {
    return children;
  } else {
    navigate("/login");
    return null;
  }
};

export default CheckInSecurity;
