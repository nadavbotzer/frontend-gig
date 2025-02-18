export function RadioItem({ name, option, value, onChange }) {
    return (
        <label className="radio-item-wrapper">
            <input
                onChange={onChange}
                name={name}
                value={option.value}
                type="radio"
                defaultChecked={option.value === value} // Use `checked` instead of `defaultChecked` for controlled behavior
                hidden
            />
            <span className="radio-dot"></span>
            <div className="radio-label">{option.label}</div>
        </label>
    );
}
