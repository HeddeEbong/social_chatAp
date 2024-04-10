import { useRef, useState } from "react";
import Tooltip from "./ToolTip";
const ItemWithTooltip = ({ toolTipContent, children }) => {
  const containerRef = useRef(null);
  const [targetRec, setTargetRec] = useState();
  return (
    <div>
      <div
        onPointerLeave={() => {
          setTargetRec(null);
        }}
        
        onPointerEnter={() => {
          const rect = containerRef.current.getBoundingClientRect();
          setTargetRec({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          });
        }}
        ref={containerRef}
      >
        {children}
      </div>
      {targetRec && <Tooltip targetRec={targetRec}>{toolTipContent}</Tooltip>}
    </div>
  );
};

export default ItemWithTooltip;
