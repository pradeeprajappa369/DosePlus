import { ToastContainer, Slide, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "warning" | "info";

interface ShowToastProps {
  message: string;
  type?: ToastType;
  actionLabel?: string;
  onActionClick?: () => void;
}

export const AppToaster = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      closeOnClick={false}
      draggable={false}
      pauseOnHover
      pauseOnFocusLoss
      newestOnTop
      closeButton={false}
      transition={Slide}
      toastClassName={({ type }) =>
        `
        min-w-[320px] max-w-[420px]
        px-4 py-3 rounded-xl shadow-lg
        flex items-center
        bg-[var(--bg-secondary)]
        border border-[var(--border-color)]
        text-[var(--text-primary)]
        ${
          type === "success"
            ? "border-l-4 border-green-500"
            : type === "error"
            ? "border-l-4 border-red-500"
            : type === "warning"
            ? "border-l-4 border-yellow-500"
            : "border-l-4 border-accent"
        }
        `
      }
      bodyClassName="p-0 m-0"
    />
  );
};
export const showToast = ({
    message,
    type = "success",
    actionLabel,
    onActionClick,
  }: ShowToastProps) => {
    toast.dismiss();
  
    toast(
      ({ closeToast }) => (
        <div className="flex items-center justify-between gap-4 w-full">
          <span className="text-sm font-medium">
            {message || "Something went wrong"}
          </span>
  
          {actionLabel && (
            <button
              onClick={() => {
                onActionClick?.();
                closeToast();
              }}
              className="text-sm font-semibold text-accent hover:underline"
            >
              {actionLabel}
            </button>
          )}
        </div>
      ),
      { type }
    );
  };
  