import { useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY

const SearchBox = ({ setResulfSearch, setIsSearch }) => {
    const [search, setSearch] = useState('')


    const handleSearch = async (e) => {
        e.preventDefault()
        const response = await fetch(`${urlApiAudioServer}search?keyword=${search}`,
            {
                headers: {
                    'x-api-key': apiKey
                }
            })
        const data = await response.json()
        setResulfSearch(data.metadata)
        setIsSearch(true)
    }

    const handleSentInput = (e) => {
        if (e.key === 'Enter' & search !== '') {
            handleSearch(e)
        }
    }
    return (
        <div className="searchBox">
            <HiMagnifyingGlass size={22} />
            <input type="text"
                className="textSearch"
                placeholder="Nhập thông tin muốn tìm"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleSentInput}
            />
        </div>
    )
}

export default SearchBox