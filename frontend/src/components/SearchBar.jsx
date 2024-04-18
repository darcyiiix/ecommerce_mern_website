import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {

    const { keyword: urlKeyword } = useParams();
    const [ keyword, setKeyword] = useState(urlKeyword || '')
    const navigate  = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim){
            console.log(keyword)
            navigate(`/search/${keyword}`)
            setKeyword('');
        } else{
            navigate('/');
        }
    }

  return (
    <>
        <input
        type="text"
        className="w-full flex-auto rounded-full border border-1 border-solid border-white text-white bg-transparent bg-clip-padding pl-10 pr-1 py-[0.25rem] placeholder:text-white placeholder:opacity-50 focus:outline-none focus:ring-0 focus:border-white"
        id="exampleSearch"
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}/>

        <button onClick={submitHandler} className='absolute left-3 top-1/2 transform -translate-y-1/2'> <FaSearch className='text-white' /> </button>
    </>
  )
}

export default SearchBar