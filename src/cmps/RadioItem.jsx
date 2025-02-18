import { createContext } from "react"

const RadioContext = createContext()


export function RadioItem({ name, option, value, onChange, children }) {
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
            {children ? children : (
                <div className="radio-label">{option.label}
                </div>
            )}
        </label>
    )
}

RadioItem.Label = function Label({ children }) {
    return <div className="radio-label" >{children}</div>
}

