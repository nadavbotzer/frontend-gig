import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import SearchIcon from '@mui/icons-material/Search'

export function SearchBar({ isBtnInline, placeholder }) {
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('')

    const onSearchCtg = () => {
        if (searchTerm.trim()) {
            navigate(`/gig/?tags=${encodeURIComponent(searchTerm)}`)
        }
    }

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div className='search-bar'>
            <input
                className={`${isBtnInline ? 'full-border' : ''}`}
                onChange={handleInputChange}
                value={searchTerm}
                type="search"
                placeholder={placeholder}>
            </input>
            <button
                onClick={onSearchCtg}
                className={`btn-search ${isBtnInline ? 'btn-inline' : 'btn-outline'}`}>
                <SearchIcon />
            </button>
        </div>
    )
}