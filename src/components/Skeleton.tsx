import classNames from "classnames";

function Skeleton({ times, className }: { times: number; className?: string }) {
  const boxes = new Array(times).fill(0).map((_, i) => (
    <div key={i} className={classNames("relative overflow-hidden bg-gray-200 rounded mb-2.5", className)}>
      <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
    </div>
  ));

  return <>{boxes}</>;
}

export default Skeleton;
