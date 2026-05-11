import { useLocation } from "react-router";

export default function ComingSoon() {
  const location = useLocation();
  const lastSegment = location.pathname.split("/")[1];

  return (
    <>
      <title>{`${lastSegment[0].toUpperCase() + lastSegment.slice(1)} - COMING SOON`}</title>
      <div className="flex items-center justify-center px-4">
        <span className="text-center text-3xl font-semibold text-donathell-main sm:text-6xl md:text-8xl lg:text-9xl">
          COMING SOON
        </span>
      </div>
    </>
  );
}
