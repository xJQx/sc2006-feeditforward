import React from "react";
import { ScreenTitle } from "../../components";

export const AdminBanUser = () => {
  return (
    <div>
      <ScreenTitle title="Ban User" />
      <div className="flex flex-col justify-center mt-12 gap-10">
        <div className="flex flex-row gap-3 p-1 px-3 items-center justify-start rounded-lg border-2 border-slate-300">
          <div>
            <img src="https://picsum.photos/id/237/200/300" alt="" className="w-10 aspect-square rounded-full object-cover object-center" />
          </div>
          <div>
            <h1 className="text-lg font-bold">John</h1>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
};
