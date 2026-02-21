"use client";

import { useEffect, useRef, useState } from "react";

import Icon from "../Icon";

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
        onClick={() => setIsOpen(!isOpen)}
        className="border-border-light hover:bg-bg-light flex h-full w-full items-center justify-between rounded-lg border bg-bg-white px-[21px] py-[13px] text-text-primary transition-colors"
      >
        <span>{displayLabel}</span>
        <Icon
          name={isOpen ? "chevron-up" : "chevron-down"}
          width="20px"
          className="text-text-secondary"
        />
      </button>

      {isOpen && (
        <ul className="border-border-light absolute top-full z-10 mt-1 w-full rounded-lg border bg-bg-white shadow-lg">
          {options.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => handleSelect(option.value)}
                className={`block w-full px-[21px] py-[13px] text-left transition-colors hover:bg-bg-pale-blue ${
                  selectedValue === option.value
                    ? "text-primary-blue"
                    : "text-text-primary"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
