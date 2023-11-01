import React from "react";
import { ScreenTitle } from "../../components";
import { SearchBar } from "../../components";
import { FaUser } from "react-icons/fa";

export const AdminProcessReviews = () => {
  return (
    <div>
      <ScreenTitle title="Process Reviews" />
      <div className="flex flex-col justify-center mt-12 gap-10">
        <SearchBar searchItem={"process"}/>
        <div className="border-4 border-slate-300 rounded-lg h-[25rem] overflow-y-auto">
            <ul className="list-none">
                <li className="flex flex-row gap-3 p-3 items-center justify-start border-b-2 border-slate-300">
                    <div>
                      <img src="https://picsum.photos/id/237/200/300" alt="" className="w-10 aspect-square rounded-full object-cover object-center" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">John</h1>
                        <p>Customer</p>
                    </div>
                    <div className="">
                      <p className="text-xs">Hi I have a request.</p>
                    </div>
                </li>
                <li className="flex flex-row gap-3 p-3 items-center justify-start border-b-2 border-slate-300">
                    <div>
                        <img src="https://picsum.photos/id/237/200/300" alt="" className="w-10 aspect-square rounded-full object-cover object-center" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">Tim</h1>
                        <p>Driver</p>
                    </div>
                </li>
                <li className="flex flex-row gap-3 p-3 items-center justify-start border-b-2 border-slate-300">
                    <div>
                        <img src="https://picsum.photos/id/237/200/300" alt="" className="w-10 aspect-square rounded-full object-cover object-center" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">Tom</h1>
                        <p>Hawker</p>
                    </div>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
};
