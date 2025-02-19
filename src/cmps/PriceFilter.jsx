import { RadioItem } from "./RadioItem";

export function PriceFilter({ filter, value, handleChange }) {
    const getBudgetAfterLabel = (budget) => {
        const [min, max] = budget.split('-');

        if (max) {
            if (!min) return `Under $${max}`;
            return `$${min} - $${max}`;
        } else if (min) {
            if (!min) return 'Free';
            return `$${min} & Above`;
        }
        return '';
    };


    return (
        <div className="budget filter-content">
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
                            <span className="budget-span" > {getBudgetAfterLabel(option.value)} </span>
                        </RadioItem.Label>
                    </RadioItem>
                ))}
            </div>
        </div>
    );
}
