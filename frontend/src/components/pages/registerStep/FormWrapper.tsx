import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

function formWrapper({ title, children }: Props) {
  return (
    <>
      <div className="">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {title}
        </h1>
        {children}
      </div>
    </>
  );
}

export default formWrapper;
