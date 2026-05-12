import { toast } from "react-toastify";
import type { TypeOptions } from "react-toastify";

type ToastType = TypeOptions;

interface ToastOptions {
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
}

const defaultOptions: ToastOptions = {
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showToast = (
  message: string,
  type: ToastType = "info",
  options?: ToastOptions
) => {
  const finalOptions = { ...defaultOptions, ...options };
  (toast as any)[type](message, finalOptions);
};

export const showSuccess = (message: string, options?: ToastOptions) => {
  showToast(message, "success", options);
};

export const showError = (message: string, options?: ToastOptions) => {
  showToast(message, "error", { ...options, autoClose: 4000 });
};

export const showWarning = (message: string, options?: ToastOptions) => {
  showToast(message, "warning", options);
};

export const showInfo = (message: string, options?: ToastOptions) => {
  showToast(message, "info", options);
};

export const showLoading = (message: string = "Loading...") => {
  return toast.loading(message);
};

export const updateToast = (
  toastId: string | number,
  message: string,
  type: ToastType = "info"
) => {
  toast.update(toastId, {
    render: message,
    type,
    isLoading: false,
    autoClose: 3000,
  });
};

export const dismissToast = (toastId?: string | number) => {
  if (toastId !== undefined) {
    toast.dismiss(toastId);
  } else {
    toast.dismiss();
  }
};
