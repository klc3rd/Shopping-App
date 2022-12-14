import { useState } from "react";

interface IIcon {
  icon: string;
  className?: string;
}

const Icons: React.FC<IIcon> = (props) => {
  const { icon, className } = props;
  const [locked, setLocked] = useState<boolean>(true);

  let renderIcon;

  if (icon == "user" || icon == "name") {
    renderIcon = (
      <>
        <title>Person Circle</title>
        <path d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z" />
        <path d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z" />
      </>
    );
  }

  if (icon == "email") {
    renderIcon = (
      <>
        <title>Mail</title>
        <path d="M424 80H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h336a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zm-14.18 92.63l-144 112a16 16 0 01-19.64 0l-144-112a16 16 0 1119.64-25.26L256 251.73l134.18-104.36a16 16 0 0119.64 25.26z" />
      </>
    );
  }

  if (icon == "lock") {
    if (locked == true) {
      renderIcon = (
        <>
          <title>Lock Closed</title>
          <path d="M368 192h-16v-80a96 96 0 10-192 0v80h-16a64.07 64.07 0 00-64 64v176a64.07 64.07 0 0064 64h224a64.07 64.07 0 0064-64V256a64.07 64.07 0 00-64-64zm-48 0H192v-80a64 64 0 11128 0z" />
        </>
      );
    } else {
      renderIcon = (
        <>
          <title>Lock Open</title>
          <path d="M368 192H192v-80a64 64 0 11128 0 16 16 0 0032 0 96 96 0 10-192 0v80h-16a64.07 64.07 0 00-64 64v176a64.07 64.07 0 0064 64h224a64.07 64.07 0 0064-64V256a64.07 64.07 0 00-64-64z" />
        </>
      );
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon` + " " + className}
      viewBox="0 0 512 512"
      onClick={() => {
        setLocked((lockStatus) => !lockStatus);
      }}
    >
      {renderIcon}
    </svg>
  );
};

Icons.displayName = "Icons";
export default Icons;
