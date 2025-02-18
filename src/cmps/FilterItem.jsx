import { useRef, useState } from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import useModal from "../customHooks/useModal"
import { DropDown } from "../cmps/DropDown"
import { RadioItem } from "./RadioItem"

export function FilterItem({ filter, onApplyFilter, initialValue, onClearFilter }) {
    const [isOpen, toggleModal] = useModal()
    const buttonRef = useRef(null)
    const [value, setValue] = useState(initialValue || "")

    function handleChange(event) {
        setValue(event.target.value)
    }

    function getBudgetAfterLabel(budget) {
        if (budget === '-467') return 'Under USD$467'
        if (budget === '467-1495') return ' USD$467-USD$1,495'
        if (budget === '1495-') return ' USD$1,495 & Above'
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
                        >
                            <RadioItem.Label>
                                {option.label}
                                <span> {getBudgetAfterLabel(option.value)} </span>
                            </RadioItem.Label>
                        </RadioItem>
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
                            >

                            </RadioItem>
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
                        <button className="btn clear-btn" onClick={() => {
                            onClearFilter(filter.key)
                            toggleModal()
                            setValue('')
                        }}>Clear all</button>
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
