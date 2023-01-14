import React, { ReactNode, useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

function ExpandablePanel({ header, children }: { header: ReactNode; children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center ">
        <div className="flex items-center justify-between">{header}</div>
        <div className="cursor-pointer" onClick={() => setExpanded((pv) => !pv)}>
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
