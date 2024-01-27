export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};
