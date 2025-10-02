import { useEffect, useRef, useState, createContext, useContext } from "react";
import { Modal } from "./Modal";

const DropDownContext = createContext();

export function DropDown({ children, isOpen, toggleModal, buttonRef, className }) {
    const dropdownRef = useRef(null);
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (!isOpen || !buttonRef.current) return

        const updatePosition = () => {
            const rect = buttonRef.current.getBoundingClientRect()
            const viewportWidth = window.innerWidth
            const viewportHeight = window.innerHeight
            
            let top = rect.bottom + window.scrollY
            let left = rect.left + window.scrollX
            
            // Get dropdown dimensions (estimate if not rendered yet)
            const dropdownRect = dropdownRef.current?.getBoundingClientRect()
            const dropdownWidth = dropdownRect?.width || Math.max(rect.width, 200)
            const dropdownHeight = dropdownRect?.height || 150
            
            // Adjust horizontal position if dropdown would go off-screen
            if (left + dropdownWidth > viewportWidth) {
                // Try aligning to the right edge of the button
                left = rect.right + window.scrollX - dropdownWidth
                
                // If still off-screen, align to viewport edge with margin
                if (left < 10) {
                    left = Math.max(10, viewportWidth - dropdownWidth - 10)
                }
            }
            
            // Ensure minimum left margin
            left = Math.max(10, left)
            
            // Adjust vertical position if dropdown would go off-screen
            const spaceBelow = viewportHeight - rect.bottom
            const spaceAbove = rect.top
            
            if (spaceBelow < dropdownHeight + 10 && spaceAbove > dropdownHeight + 10) {
                // Not enough space below but enough above - flip to top
                top = rect.top + window.scrollY - dropdownHeight - 4
            } else if (spaceBelow < dropdownHeight + 10 && spaceAbove < dropdownHeight + 10) {
                // Not enough space above or below - position in largest available space
                if (spaceBelow > spaceAbove) {
                    top = rect.bottom + window.scrollY + 4
                } else {
                    top = Math.max(10 + window.scrollY, rect.top + window.scrollY - dropdownHeight - 4)
                }
            }
            
            setPosition({
                top,
                left,
                width: rect.width,
            })
        }

        // Update position immediately
        updatePosition()

        // Add resize listener
        window.addEventListener('resize', updatePosition)
        
        return () => {
            window.removeEventListener('resize', updatePosition)
        }
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

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen, toggleModal, buttonRef])

    // Only render when we have a valid position to prevent jumping from (0,0)
    if (!position) return null;

    return (
        <Modal isOpen={isOpen}>
            <DropDownContext.Provider value={{ toggleModal }}>
                <div
                    ref={dropdownRef}
                    className={`dropdown ${className}`}
                    style={{
                        top: `calc(${position.top}px + 0.25rem)`,
                        left: `${position.left}px`,
                        minWidth: `${position.width}px`,
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
