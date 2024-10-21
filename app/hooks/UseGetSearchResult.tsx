import { useQuery } from '@tanstack/react-query'
import React from 'react'

const UseGetSearchResult = () => {
    const {} = useQuery({
        queryKey: ['search', searchValue],
        queryFn: async (searchValue) => {
            // fetch data from an API
            const res = await fetch("")
            // const response = await fetch(`https://api.example.com/search?query=${searchValue}`)
            // const data = await response.json()
            // return data
        },
        // refetchInterval: 10000, // refetch every 10 seconds
        staleTime: 60000, // cache for 1 minute
        // retry: 3, // retry 3 times on failure
        // refetchOnWindowFocus: false, // only refetch on page focus
        // refetchOnReconnect: false, // only refetch on network reconnection
        // refetchOnMount: false, // only refetch on component mount
        // cacheTime: 10000, // cache for 10 seconds
        // initialData: [], // initial data to return before
    })


  return (
   
  )
}

export default UseGetSearchResult