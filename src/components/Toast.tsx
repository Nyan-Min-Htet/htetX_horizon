import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Toast({ message, type = "success", onClose }: any) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 px-10 py-10 rounded-xl shadow-lg text-white transition
      ${type === "error" ? "bg-red-500" : "bg-green-500"}`}
    >
      {message}
    </div>
  );
}
