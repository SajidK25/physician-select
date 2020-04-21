import { useContext } from "react";
import ConfirmContext from "./ConfirmContext";

export const useConfirm = () => {
  const confirm = useContext(ConfirmContext);
  return confirm;
};
