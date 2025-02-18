import { useRef, useState } from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import useModal from "../customHooks/useModal"
import { DropDown } from "../cmps/DropDown"
import { RadioItem } from "./RadioItem"
import { PriceFilter } from "./PriceFilter"
import { DeliveryTimeFilter } from "./DeliveryTimeFilter"

export function FilterItem({ filter, onApplyFilter, initialValue, onClearFilter }) {
    const [isOpen, toggleModal] = useModal()
    const buttonRef = useRef(null)
    const [value, setValue] = useState(initialValue || "")

    function handleChange(event) {
        setValue(event.target.value)
    }

    function getBudgetAfterLabel(budget) {
        const [min, max] = budget.split('-');

        if (max) {
            return `USD$${min} - USD$${max}`;
        } else if (min) {
            if (min === '0') return 'Free';
            return `USD$${min} & Above`;
        }
        return '';
    }


    function renderFilterContent() {
        switch (filter.key) {
            case "price":
                return <PriceFilter filter={filter} value={value} handleChange={handleChange} />;
            case "deliveryTime":
                return <DeliveryTimeFilter filter={filter} value={value} handleChange={handleChange} />;
            default:
                return null;
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
                <DropDown.Content>{renderFilterContent()}</DropDown.Content>
                <DropDown.Footer>
                    <div className="filter-actions">
                        <button
                            className="btn clear-btn"
                            onClick={() => {
                                onClearFilter(filter.key);
                                toggleModal();
                                setValue('');
                            }}
                        >
                            Clear all
                        </button>
                        <button
                            onClick={() => {
                                onApplyFilter(filter, value);
                                toggleModal();
                            }}
                            className="btn apply-btn"
                        >
                            Apply
                        </button>
                    </div>
                </DropDown.Footer>
            </DropDown>
        </>
    );
}
