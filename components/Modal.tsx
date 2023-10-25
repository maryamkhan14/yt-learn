"use client";
import { useRouter } from "next/navigation";

function Modal({
  children,
  size,
}: {
  children: React.ReactNode;
  size: "xl" | "md" | "sm";
}) {
  const router = useRouter();
  return (
    <>
      <div className="fixed left-2/4 top-2/4 z-[100] -translate-x-1/2 -translate-y-1/2 scale-110 overflow-x-hidden  overflow-y-hidden rounded  border-2 outline-none focus:outline-none">
        <div
          className={`relative flex  ${
            size === "xl" && "w-[85vw] md:w-[60vw]"
          } overflow-y-hidden `}
        >
          {/*content*/}
          <div className="flex max-h-[80vh] w-full flex-col overflow-x-hidden overflow-y-scroll rounded-lg border-0  bg-slate-900 outline-none focus:outline-none ">
            {/*body*/}

            {children}
            {/*footer*/}
            <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
              <button
                className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => router.back()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 z-40 h-full w-full bg-black opacity-25"
        onClick={() => router.back()}
      ></div>
    </>
  );
}

export default Modal;
