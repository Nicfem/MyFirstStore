import { useEffect, useState } from 'react'

export const useDebounce = (value, delay = 300) => {
    const [debounced, setDobounced] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDobounced(value)
        },delay)
        return () => clearTimeout(handler)
    },[value, delay])

    return debounced
}