import { createRef, useCallback } from 'react'
import { useEffect, useState, Children, cloneElement, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Corusel.scss'

const arrowLeft = '<'
const arrowRight = '>'

export const Corusel = ({ pagesArr }) => {
    const ref = useRef()
    const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)
    const pageRef = useRef(0)
    
    const [transitionDur, setTransitionDur] = useState(800)
    const [liWidth, setLiWidth] = useState(970)
    const liWidthRef = useRef()

    liWidthRef.current = liWidth

    useEffect(() => {
        // setPages(
        //     Children.map(children, (child, index) => {
        //         return cloneElement(child, {
        //             style: {
        //                 height: '100%',
        //                 // minWidth: `${PAGE_WIDTH}px`,
        //                 minWidth: `100%`,
        //                 // maxWidth: `${PAGE_WIDTH}px`,
        //                 // marginLeft: '20px',
        //                 display: 'flex',
        //                 justifyContent: 'center',
        //                 alignItems: 'center'
        //             },
        //         })
        //     })
        // )
        setPages(pagesArr.length)
    },[])

    const handlLeftArrow = () => {
        setTransitionDur(800)
        setOffset((currentOffset) => {
            let newOffset = currentOffset + ref.current.offsetWidth
            if(newOffset > 0) {
                newOffset = -(ref.current.offsetWidth * (pages.length - 1))
                return newOffset - (20 * pages.length - 1)
            } 
            return newOffset + 30
        })

        if(pageRef.current > 0) {
            pageRef.current -= 1
        } else {
            pageRef.current = pages.length
        }
    }   

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
    
    // const handlRightArrow = () => {
    //     setTransitionDur(800)
    //     setOffset((currentOffset) => {
    //         const newOffset = currentOffset - ref.current.offsetWidth
    //         const maxOffset = -(ref.current.offsetWidth * (pages.length))
    //         if(newOffset < maxOffset) {
    //             return 0
    //         } 
    //         return newOffset
    //     })

    //     if(pageRef.current < pages.length - 1) {
    //         pageRef.current += 1
    //     } else {
    //         pageRef.current = 0
    //     }
    // }







    const activeRef = useRef(false)
    
    const resizeHandler = () => {
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





    // const resizeHandler = () => {
    //     if(!activeRef.current) {
    //         activeRef.current = true
    //         setTimeout(() => {
    //             setOffset((currentOffset) => {
    //                 if(currentOffset === 0) {
    //                     return currentOffset
    //                 }
    //                 const newOffset = currentOffset - (currentOffset + (ref.current.offsetWidth * pageRef.current) - (-20 * (pageRef.current + 1)))
    //                 return newOffset
    //             })
    //             activeRef.current = false
    //         },25)
    //     }
    // }

    // const resizeHandler = () => {
    //     if(!activeRef.current) {
    //         activeRef.current = true
    //         setOffset((currentOffset) => {
    //             if(currentOffset === 0) {
    //                 return currentOffset
    //             }
    //             const newOffset = currentOffset - (currentOffset + (ref.current.offsetWidth * pageRef.current) - (-20 * (pageRef.current + 1)))
    //             return newOffset
    //         })
    //         activeRef.current = false
    //     }
    // }

    useEffect(() => {
        window.addEventListener("resize", resizeHandler)
        return () => {
            window.removeEventListener("resize", resizeHandler)
        }
    },[])




    useEffect(() => {
        const interval = setInterval(() => {
            console.log('work')
            handlRightArrow()
        }, 3000)

        return () => {
            clearInterval(interval) 
        }
    },[handlRightArrow])

    return (
        <div className="Corusel__container">
            <div onClick={handlLeftArrow}>
                {arrowLeft}
            </div>
            <div className="Corusel__window" ref={ref}>
                <ul className="Corusel__all-items-container"
                    style={{
                        // transform: `translateX(${offset}px)`,
                        transform: `translate3d(${offset}px, 0px, 0px)`,
                        // transition: 'translate',
                        // transitionProperty: 'transform',
                        transitionDuration: `${transitionDur}ms`,
                        // transitionTimingFunction: 'ease-in-out',
                    }}
                >
                    {/* {pages} */}
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
            <div onClick={handlRightArrow}>
                {arrowRight}
            </div>
        </div>
    )
}