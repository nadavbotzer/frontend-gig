import { RadioItem } from "./RadioItem";

export function PriceFilter({ filter, value, handleChange }) {
    const getBudgetAfterLabel = (budget) => {
        if (budget === '-467') return 'Under USD$467';
        if (budget === '467-1495') return ' USD$467-USD$1,495';
        if (budget === '1495-') return ' USD$1,495 & Above';
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
