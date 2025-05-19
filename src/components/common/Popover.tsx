import React, { ReactNode, useRef, useEffect } from 'react';

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  align?: 'left' | 'right';
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  isOpen,
  setIsOpen,
  align = 'right',
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={popoverRef}>
      {trigger}

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 ${
            align === 'right' ? 'right-0' : 'left-0'
          } shadow-lg`}
        >
          {children}
        </div>
      )}
    </div>
  );
};