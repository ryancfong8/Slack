import React, { useRef, useEffect } from 'react';

/**
 * Component that alerts if you click outside of it
 */
export default function ClickOutsideWrapper(props) {
  const { onClickOutside } = props;
  const wrapperRef = useRef(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClickOutside(event);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="w-100">
      {props.children}
    </div>
  );
}
