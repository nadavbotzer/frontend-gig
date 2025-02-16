import { useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useModal from "../customHooks/useModal";
import { DropDown } from "../cmps/DropDown";

export function FilterItem({ filter }) {
    const [isOpen, toggleModal] = useModal();
    const buttonRef = useRef(null);

    return (
        <>
            <button ref={buttonRef} onClick={toggleModal} className="btn">
                {filter.label} <KeyboardArrowDownIcon />
            </button>
            <DropDown isOpen={isOpen} toggleModal={toggleModal} buttonRef={buttonRef}>
                <DropDown.Header>
                    Header
                </DropDown.Header>
                <DropDown.Content>
                    Content
                </DropDown.Content>
                <DropDown.Footer>
                    Footer
                </DropDown.Footer>
            </DropDown>
        </>
    )
}
