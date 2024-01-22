import { useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

import { urlApiAudioServer, apiKey } from '/src/constants/env'

import './style.css'


const SearchBox = ({ setResulfSearch, setIsSearch }) => {
    const [search, setSearch] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        fetch(`${urlApiAudioServer}search?keyword=${search}`,
            {
                headers: {
                    'x-api-key': apiKey
                }
            })
            .then(response => response.json())
            .then(data => {
                data.statusCode === 200 && setResulfSearch(data.metadata)
                setIsSearch(true)
            })

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
                placeholder="Nhập thông tin bạn muốn tìm"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleSentInput}
            />
        </div>
    )
}

export default SearchBox