"use client";

import { useEffect, useRef, useState } from "react";

import Icon from "../Icon";
import { useDropdownKeyboard } from "./hooks/useDropdownKeyboard";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  dropdownClassName?: string;
  options: DropdownOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export default function Dropdown({
  dropdownClassName = "w-full",
  options,
  selectedValue,
  onSelect,
  placeholder = "Select option",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayLabel = selectedOption?.label || placeholder;

  const {
    focusedIndex,
    optionRefs,
    buttonRef,
    handleButtonKeyDown,
    handleOptionKeyDown,
  } = useDropdownKeyboard({
    optionsLength: options.length,
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onSelect: (index) => handleSelect(options[index].value),
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${dropdownClassName}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleButtonKeyDown}
        className="border-border-light hover:bg-bg-light focus:bg-bg-light flex h-full w-full items-center justify-between rounded-lg border bg-bg-white px-[21px] py-[13px] text-text-primary transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{displayLabel}</span>
        <Icon
          name={isOpen ? "chevron-up" : "chevron-down"}
          width="20px"
          className="text-text-secondary"
        />
      </button>

      {isOpen && (
        <ul
          className="border-border-light absolute top-full z-10 mt-1 w-full rounded-lg border bg-bg-white shadow-lg"
          role="listbox"
          aria-label="Dropdown options"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              role="option"
              aria-selected={selectedValue === option.value}
              onClick={() => handleSelect(option.value)}
              onKeyDown={(e) => handleOptionKeyDown(e, index)}
              tabIndex={focusedIndex === index ? 0 : -1}
              className={`block w-full cursor-pointer px-[21px] py-[13px] text-left transition-colors hover:bg-bg-pale-blue focus:bg-bg-pale-blue focus:outline-none ${
                selectedValue === option.value
                  ? "text-primary-blue"
                  : "text-text-primary"
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
