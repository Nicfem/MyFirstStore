import { useEffect, useState, Children, cloneElement } from 'react'
import './Corusel.scss'

const PAGE_WIDTH = 970

const arrowLeft = '<'
const arrowRight = '>'

export const Corusel = ({ children }) => {
    const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)

    console.log(pages)
    useEffect(() => {
        setPages(
            Children.map(children, child => {
                return cloneElement(child, {
                    style: {
                        height: '100%',
                        // minWidth: `${PAGE_WIDTH}px`,
                        minWidth: `100%`,
                        // maxWidth: `${PAGE_WIDTH}px`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                })
            })
        )
    },[])

    const handlLeftArrow = () => {
        setOffset((currentOffset) => {
            let newOffset = currentOffset + PAGE_WIDTH
            if(newOffset > 0) {
                console.log(newOffset)
                console.log(PAGE_WIDTH)
                newOffset = -(PAGE_WIDTH * (pages.length - 1))
                console.log(newOffset)
                return newOffset 
            } 
            return newOffset
        })
    }   

    const handlRightArrow = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset - PAGE_WIDTH
            const maxOffset = -(PAGE_WIDTH * (pages.length - 1))
            if(newOffset < maxOffset) {
                return 0
            }
            return Math.max(newOffset, maxOffset) 
        })
    }

    return (
        <div className="Corusel__container">
            <div onClick={handlLeftArrow}>
                {arrowLeft}
            </div>
            <div className="Corusel__window">
                <div className="Corusel__all-items-container"
                    style={{
                        transform: `translateX(${offset}px)`
                    }}
                >
                    {pages}
                </div>
            </div>
            <div onClick={handlRightArrow}>
                {arrowRight}
            </div>
        </div>
    )
}