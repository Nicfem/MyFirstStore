import { useCallback, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Corusel.scss'

const arrowLeft = '<'
const arrowRight = '>'

export const Corusel = ({ pagesArr }) => {
    const ref = useRef()
    const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)
    const pageRef = useRef(0)
    const activeRef = useRef(false)
    
    const [transitionDur, setTransitionDur] = useState(800)
    const [liWidth, setLiWidth] = useState(970)
    const liWidthRef = useRef()

    liWidthRef.current = liWidth

    useEffect(() => {
        setPages(pagesArr.length)
    },[])

    const handlLeftArrow = () => {
        setTransitionDur(800)
        setOffset((currentOffset) => {
            let newOffset = currentOffset + liWidth
            if(newOffset > 0) {
                newOffset = -(liWidth * (pages - 1))
                console.log(newOffset)
                return newOffset 
            } 
            return newOffset
        })

        if(pageRef.current > 0) {
            pageRef.current -= 1
        } else {
            pageRef.current = pages.length
        }
    }   
    
    const resizeHandler = () => {
        clearTimeout(rigt_stop.timeout)
        if(!activeRef.current) {
            setTransitionDur(0)
            activeRef.current = true

            setTimeout(() => {

                setLiWidth(() => {
                    const Window = window.innerWidth
                    if(Window < 1340) {
                        return 970 - (1340 - Window)
                    } else {
                        return 970
                    }
                })

                setOffset((currentOffset) => {
                    if(currentOffset === 0) {
                        return currentOffset
                    }
                    const newOffset = currentOffset - (currentOffset + (liWidthRef.current * pageRef.current))
                    return newOffset
                })
                activeRef.current = false

            },50)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", resizeHandler)
        resizeHandler()
        return () => {
            window.removeEventListener("resize", resizeHandler)
        }
    },[])

    function start_interval_corusel() {
        const interval = setInterval(() => {
            handlRightArrow()
        }, 3000)
        return interval
    }

    const rigt_stop = useCallback(() => {
        clearInterval(rigt_stop.interval)
    },[])
    
    useEffect(() => {

        rigt_stop.interval = start_interval_corusel()
        
        return () => {
            rigt_stop()  
        } 

    },[pages, liWidth])



    const handlRightArrow = () => {
        setTransitionDur(800)
        setOffset((currentOffset) => {
            const newOffset = currentOffset - liWidth
            const maxOffset = -(liWidth * pages - 1)
            if(newOffset < maxOffset) {
                return 0
            } 
            return newOffset
        })

        if(pageRef.current < pages - 1) {
            pageRef.current += 1
        } else {
            pageRef.current = 0
        }
    }

    const handlRigth = () => {
        clearTimeout(rigt_stop.timeout)
        rigt_stop()
        handlRightArrow() 

        rigt_stop.timeout = setTimeout(() => {
            rigt_stop.interval = start_interval_corusel()
        },2000)
    }

    const handlLeft = () => {
        clearTimeout(rigt_stop.timeout)
        rigt_stop()
        handlLeftArrow()

        rigt_stop.timeout = setTimeout(() => {
            rigt_stop.interval = start_interval_corusel()
        },2000)
    }

    return (
        <div className="Corusel__container">
            <div className='Corusel__button Corusel__button--prev' onClick={handlLeft}>
                {arrowLeft}
            </div>
            <div className="Corusel__window" ref={ref}>
                <ul className="Corusel__all-items-container"
                    style={{
                        transform: `translate3d(${offset}px, 0px, 0px)`,
                        transitionDuration: `${transitionDur}ms`,
                    }}
                >
                    {pagesArr.map(x => 
                        <li 
                            className='slider_item'
                            style={
                                {
                                    width: `${liWidth}px`,
                                }
                            }
                        >
                            <Link to={'/'}>
                                <img src={x}/>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
            <div className='Corusel__button Corusel__button--next' onClick={handlRigth}>
                {arrowRight}
            </div>
        </div>
    )
}