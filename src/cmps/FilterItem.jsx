import { useRef, useState } from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import useModal from "../customHooks/useModal"
import { DropDown } from "../cmps/DropDown"
import { RadioItem } from "./RadioItem"

export function FilterItem({ filter, onApplyFilter, initialValue }) {
    const [isOpen, toggleModal] = useModal()
    const buttonRef = useRef(null)
    const [value, setValue] = useState(initialValue || "")

    function handleChange(event) {
        setValue(event.target.value)
    }

    function getDropDownContent() {
        if (filter.key === "price") {
            return <div className="budget filter-content">
                <div className="radio-list">
                    {filter.options.map((option, idx) => (
                        <RadioItem
                            key={idx}
                            name={filter.key}
                            option={option}
                            value={value}
                            onChange={handleChange}
                        />
                    ))}
                </div>
            </div>
        }

        if (filter.key === "deliveryTime") {
            return (
                <div className="delivery-time filter-content">
                    <div className="radio-list">
                        {filter.options.map((option, idx) => (
                            <RadioItem
                                key={idx}
                                name={filter.key}
                                option={option}
                                value={value}
                                onChange={handleChange}
                            />
                        ))}
                    </div>
                </div>
            );
        }
    }

    return (
        <>
            <div className="filter-item">
                <button ref={buttonRef} onClick={toggleModal} className="btn">
                    {filter.label} <KeyboardArrowDownIcon />
                </button>
            </div>
            <DropDown className="filter-item-dropdown" isOpen={isOpen} toggleModal={toggleModal} buttonRef={buttonRef}>
                <DropDown.Content>{getDropDownContent()}</DropDown.Content>
                <DropDown.Footer>
                    <div className="filter-actions">
                        <button className="btn clear-btn" onClick={() => setValue("")}>Clear all</button>
                        <button onClick={() => {
                            onApplyFilter(filter, value)
                            toggleModal()
                        }} className="btn apply-btn">
                            Apply
                        </button>
                    </div>
                </DropDown.Footer>
            </DropDown>
        </>
    )
}
