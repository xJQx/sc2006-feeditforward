import React from "react";

export const Logo = (
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) => {
  return (
    <img
      src="/logo192.png"
      alt="FeedItForward logo"
      className="w-12 h-12 rounded-full"
      {...props}
    />
  );
};
