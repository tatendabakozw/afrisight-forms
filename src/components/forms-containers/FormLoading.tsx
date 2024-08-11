import React from "react";

type Props = {
  list?: boolean;
};

function FormLoading({ list }: Props) {
  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-8">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          role="status"
          className="max-w-sm bg-white border border-zinc-200/50 rounded-2xl animate-pulse "
        >
          <div
            className={`${
              list ? "h-20 p-2 mb-4" : "h-40 pt-4 px-4 "
            }bg-white w-full relative rounded-t-2xl border-b border-zinc-200/50`}
          >
            <div className="bg-zinc-200 h-full rounded-t-2xl p-4">
              <svg
                className="w-10 h-10 text-zinc-100 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
          </div>
          <div className="p-4">
            <div className="h-2.5 bg-zinc-200 rounded-full dark:bg-zinc-700 w-48 mb-4"></div>
            <div className="h-2 bg-zinc-200 rounded-full dark:bg-zinc-700 mb-2.5"></div>
            <div className="h-2 bg-zinc-200 rounded-full dark:bg-zinc-700 mb-2.5"></div>
            <div className="h-2 bg-zinc-200 rounded-full dark:bg-zinc-700"></div>
            <div className="flex items-center mt-4">
              <div>
                <div className="h-2.5 bg-zinc-200 rounded-full dark:bg-zinc-700 w-32 mb-2"></div>
                <div className="w-48 h-2 bg-zinc-200 rounded-full dark:bg-zinc-700"></div>
              </div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormLoading;
