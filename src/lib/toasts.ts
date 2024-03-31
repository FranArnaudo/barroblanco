import { toast } from "react-toastify";

export const successToast = (title: string) =>
  toast.success(title, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progressClassName: "toast-success-progress",
  });

export const errorToast = (title: string) =>
  toast.success(title, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progressClassName: "toast-success-progress",
  });
