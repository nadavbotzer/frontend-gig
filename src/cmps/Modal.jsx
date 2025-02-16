import { createPortal } from "react-dom"
const overlaysRef = document.getElementById('overlays')

export function Modal({ isOpen, children }) {
    if (!isOpen) return null
    return createPortal(children, overlaysRef)
}