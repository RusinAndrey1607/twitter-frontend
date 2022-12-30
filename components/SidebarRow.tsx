import Link from "next/link";
import React, { SVGProps } from "react";

type Props = {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  href: string;
  handleClick?: () => void;
};

const SidebarRow = ({ Icon, title, href, handleClick }: Props) => {
  return (
    <Link href={href}>
      <div
        onClick={handleClick}
        className="group max-w-fit flex items-center space-x-2 rounded-full px-1 sm:px-4 cursor-pointer transition-all duration-500 py-3 hover:bg-gray-100"
      >
        <Icon className="h-6 w-6" />
        <p className="text-base font-light  lg:text-lg group-hover:text-twitterColor transition-all duration-500 hidden md:inline-flex">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default SidebarRow;
