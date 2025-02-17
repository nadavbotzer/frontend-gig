import { useEffect, useRef, useState, createContext, useContext } from "react";
import { Modal } from "./Modal";

const DropDownContext = createContext();

export function DropDown({ children, isOpen, toggleModal, buttonRef }) {
    const dropdownRef = useRef(null);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

    useEffect(() => {
        if (!isOpen || !buttonRef.current) return

        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
        });
    }, [isOpen, buttonRef])

    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                toggleModal(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, toggleModal, buttonRef])

    return (
        <Modal isOpen={isOpen}>
            <DropDownContext.Provider value={{ toggleModal }}>
                <div
                    ref={dropdownRef}
                    className="dropdown"
                    style={{
                        position: "absolute",
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        minWidth: `${position.width}px`,
                        background: "white",
                        border: "1px solid #ccc",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        padding: "8px",
                        borderRadius: "6px",
                        zIndex: 1000
                    }}
                >
                    {children}
                </div>
            </DropDownContext.Provider>
        </Modal>
    )
}

// Subcomponents

DropDown.Header = function Header({ children }) {
    return <div className="dropdown-header" >{children}</div>;
};

DropDown.Content = function Content({ children }) {
    return <div className="dropdown-content" >{children}</div>;
};

DropDown.Footer = function Footer({ children }) {
    return <div className="dropdown-footer">{children}</div>;
};
