import { useEffect, useRef, useState } from "react";

interface UseDropdownKeyboardProps {
  optionsLength: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect?: (index: number) => void;
}

export const useDropdownKeyboard = ({
  optionsLength,
  isOpen,
  onOpen,
  onClose,
  onSelect,
}: UseDropdownKeyboardProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Focus on option when focusedIndex changes
  useEffect(() => {
    if (focusedIndex !== null && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  // Reset focused index when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(null);
    }
  }, [isOpen]);

  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (!isOpen) {
          onOpen();
          setFocusedIndex(0);
        } else {
          onClose();
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          onOpen();
          setFocusedIndex(0);
        } else if (focusedIndex !== null && focusedIndex < optionsLength - 1) {
          setFocusedIndex(focusedIndex + 1);
        } else if (focusedIndex === optionsLength - 1) {
          setFocusedIndex(0);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          onOpen();
          setFocusedIndex(optionsLength - 1);
        } else if (focusedIndex !== null && focusedIndex > 0) {
          setFocusedIndex(focusedIndex - 1);
        } else if (focusedIndex === 0) {
          setFocusedIndex(optionsLength - 1);
        }
        break;
      case "Escape":
        event.preventDefault();
        onClose();
        setFocusedIndex(null);
        break;
      default:
        break;
    }
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    index: number
  ) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        onSelect?.(index);
        onClose();
        setFocusedIndex(null);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        event.preventDefault();
        if (index < optionsLength - 1) {
          setFocusedIndex(index + 1);
        } else {
          setFocusedIndex(0);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (index > 0) {
          setFocusedIndex(index - 1);
        } else {
          setFocusedIndex(optionsLength - 1);
        }
        break;
      case "Escape":
        event.preventDefault();
        onClose();
        setFocusedIndex(null);
        buttonRef.current?.focus();
        break;
      default:
        break;
    }
  };

  return {
    focusedIndex,
    setFocusedIndex,
    optionRefs,
    buttonRef,
    handleButtonKeyDown,
    handleOptionKeyDown,
  };
};
