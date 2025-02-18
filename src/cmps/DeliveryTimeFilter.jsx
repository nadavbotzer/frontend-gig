import { RadioItem } from "./RadioItem";

export function DeliveryTimeFilter({ filter, value, handleChange }) {
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
