import SearchIcon from '@mui/icons-material/Search'

export function GigSearch() {
    return (
        <div className='search'>
            <input type="search" placeholder='What service are you looking for today?'></input>
            <button className='btn-search'>
                <SearchIcon />
            </button>
        </div>
    )
}