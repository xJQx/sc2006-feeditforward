import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface AdminCardProps {
  img: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  href: string;
}

export const AdminCard = (props: AdminCardProps) => {
  const { img, title, description, href } = props;

  return (
    <div className="flex flex-row max-w-[358px]">
      {/* Image */}
      <img src={img.src} alt={img.alt} className="rounded-l-lg" />

      {/* Content + Button */}
      <div className="flex flex-row items-center border border-brand-gray rounded-r-lg">
        {/* Content */}
        <div className="pl-4 pr-2 py-3 min-h-[120px]">
          <div className="font-bold text-[22px] text-brand-dark">{title}</div>
          <div className="text-gray-400 text-[12px] my-2">{description}</div>
        </div>

        {/* Button */}
        <Link to={href} className="mr-2">
          <FaArrowRightLong className="bg-brand-primary hover:bg-brand-primary-active text-white p-2 w-10 h-10 rounded-full" />
        </Link>
      </div>
    </div>
  );
};
