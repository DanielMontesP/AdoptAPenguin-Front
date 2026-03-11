import { Id, toast, Bounce } from "react-toastify";

let customID: Id = "custom-id";

const toastOptions = {
  position: "bottom-center" as const,
  autoClose: 1500,
  hideProgressBar: false,
  newstOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  toastId: `${customID}`,
  transition: Bounce,
};

const toastOptionsSuccess = {
  autoClose: 1500,
  closeOnClick: true,
  toastId: `${customID}`,
};

const toastOptionsWrong = {
  autoClose: 1000,
  closeOnClick: true,
  toastId: `${customID}`,
};

export const correctAction = (message: string) => {
  if (!toast?.isActive(customID)) {
    customID = toast.success(message, toastOptionsSuccess);
  }

  toast.clearWaitingQueue();
};

export const wrongAction = (message: string) => {
  if (!toast?.isActive(customID)) {
    customID = toast.error(message, toastOptionsWrong);
  }
  toast.clearWaitingQueue();
};

export const warnAction = (message: string) => {
  if (!toast?.isActive(customID)) {
    customID = toast.warning(message, toastOptionsSuccess);
  }
  toast.clearWaitingQueue();
};

export const infoAction = (message: string) => {
  if (!toast?.isActive(customID)) {
    customID = toast.loading(message, toastOptions);
  }
  toast.clearWaitingQueue();
};

export const stopLoadingAction = (): void => {
  toast?.dismiss(customID);
  toast?.clearWaitingQueue();
};

export const setLoadingOn = (message: string) => {
  toast?.loading(message, {
    position: "bottom-center" as const,
    closeOnClick: true,
    toastId: `${customID}`,
  });
};

export const setLoadingOff = (): void => {
  toast.dismiss(customID);
  toast.clearWaitingQueue();
};

export const setLoadingOffWithMessage = (message: string, error: boolean) => {
  toast.update(customID, {
    render: message,
    type: error ? "error" : "success",
    isLoading: false,
    autoClose: 2000,
    closeOnClick: true,
    transition: Bounce,
  });
  toast.clearWaitingQueue();
};
