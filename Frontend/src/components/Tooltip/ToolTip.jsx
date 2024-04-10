import { useRef,useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
const Tooltip = ({ targetRec, children }) => {
  const [tooltipHeight,setTooltipHeight]=useState(null)
  const [tooltipWidth,setTooltipWidth]=useState(null)
  const ref=useRef()

  useLayoutEffect(() => {
    const { height,width } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
    setTooltipWidth(width)
  }, []);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRec !== null) {
    tooltipX = targetRec.left;
    tooltipY = targetRec.top - tooltipHeight;
    if(tooltipWidth>targetRec.left){
      console.log(targetRec,tooltipWidth);
      // tooltipX=targetRec.right
    }
    if (tooltipY < 0) {
      // It doesn't fit above, so place below.
      tooltipY = targetRec.bottom;
    }
  }
  return (
    <div>
      {createPortal(
        <div ref={ref} style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: 0,
          top: 0,
          transform: `translate3d(${tooltipX}px, ${tooltipY-3}px, 0)`
        }} className={`absolute top-0 left-0  z-[4] bg-black p-2 rounded-md text-white`}>
          {children}
        </div>,
        document.getElementById("tooltip")
      )}
    </div>
  );
};

export default Tooltip;
