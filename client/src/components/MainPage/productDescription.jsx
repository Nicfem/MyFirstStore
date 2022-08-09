import { useParams } from "react-router-dom"
import { useGetDeviceByQuery } from "../../Redux/Device/deviceAPI"
import './Description.scss'


const ProductDiscription = () => {

    let id = useParams(ProductDiscription)

    const newID = id.id
    
    const {data: device} = useGetDeviceByQuery(newID)
    

    const serv = 'http://localhost:5000/'
    
    return (
        <>
            <div className="container">
            {device && 
                <div className="Description-Page-content">
                    <div className="Description-Page-content__img">
                        <img src={serv + device.img}/>
                    </div>
                    <div className="Description-Page__descriptions-header descriptions-header">
                        <div className="descriptions-header__title">
                            <p>{device.device}</p>
                        </div>
                        <div className="descriptions-header__pryce-block pryce-block">
                            <header className="pryce-block__header">
                                <div>
                                <span>
                                <svg width="128" height="24" viewBox="0 0 128 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FBB13C"/>
                                    <path d="M38 2L41.09 8.26L48 9.27L43 14.14L44.18 21.02L38 17.77L31.82 21.02L33 14.14L28 9.27L34.91 8.26L38 2Z" fill="#FBB13C"/>
                                    <path d="M64 2L67.09 8.26L74 9.27L69 14.14L70.18 21.02L64 17.77L57.82 21.02L59 14.14L54 9.27L60.91 8.26L64 2Z" fill="#FBB13C"/>
                                    <path d="M90 2L93.09 8.26L100 9.27L95 14.14L96.18 21.02L90 17.77L83.82 21.02L85 14.14L80 9.27L86.91 8.26L90 2Z" fill="#FBB13C"/>
                                    <path d="M116 2L119.09 8.26L126 9.27L121 14.14L122.18 21.02L116 17.77L109.82 21.02L111 14.14L106 9.27L112.91 8.26L116 2Z" fill="#FBB13C"/>
                                </svg>
                                </span>
                                <span className="pryce-block__message">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#070C11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                </span>
                                </div>
                                <div className="pryce-block__sub-compare">
                                    <span className="pryce-block__subscribe">
                                    <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.1603 2.00004C18.1002 0.937251 16.6951 0.288583 15.1986 0.171213C13.7021 0.0538432 12.213 0.475509 11.0003 1.36004C9.72793 0.413681 8.14427 -0.0154454 6.5682 0.159081C4.99212 0.333607 3.54072 1.09882 2.50625 2.30063C1.47178 3.50244 0.931098 5.05156 0.993077 6.63606C1.05506 8.22055 1.71509 9.72271 2.84028 10.84L9.05028 17.06C9.57029 17.5718 10.2707 17.8587 11.0003 17.8587C11.7299 17.8587 12.4303 17.5718 12.9503 17.06L19.1603 10.84C20.3279 9.66531 20.9832 8.07632 20.9832 6.42004C20.9832 4.76377 20.3279 3.17478 19.1603 2.00004ZM17.7503 9.46004L11.5403 15.67C11.4696 15.7414 11.3855 15.798 11.2928 15.8367C11.2001 15.8753 11.1007 15.8953 11.0003 15.8953C10.8999 15.8953 10.8004 15.8753 10.7077 15.8367C10.615 15.798 10.5309 15.7414 10.4603 15.67L4.25028 9.43004C3.46603 8.62839 3.02689 7.55151 3.02689 6.43004C3.02689 5.30858 3.46603 4.2317 4.25028 3.43004C5.04943 2.64103 6.12725 2.19861 7.25028 2.19861C8.3733 2.19861 9.45112 2.64103 10.2503 3.43004C10.3432 3.52377 10.4538 3.59817 10.5757 3.64893C10.6976 3.6997 10.8283 3.72584 10.9603 3.72584C11.0923 3.72584 11.223 3.6997 11.3449 3.64893C11.4667 3.59817 11.5773 3.52377 11.6703 3.43004C12.4694 2.64103 13.5472 2.19861 14.6703 2.19861C15.7933 2.19861 16.8711 2.64103 17.6703 3.43004C18.4653 4.22119 18.9189 5.29223 18.9338 6.41373C18.9488 7.53522 18.5239 8.61798 17.7503 9.43004V9.46004Z" fill="#C8CACB"/>
                                    </svg>
                                    </span>
                                    <span className="pryce-block__compare">
                                    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 10C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20C1.26522 20 1.51957 19.8946 1.70711 19.7071C1.89464 19.5196 2 19.2652 2 19V11C2 10.7348 1.89464 10.4804 1.70711 10.2929C1.51957 10.1054 1.26522 10 1 10ZM6 0C5.73478 0 5.48043 0.105357 5.29289 0.292893C5.10536 0.48043 5 0.734784 5 1V19C5 19.2652 5.10536 19.5196 5.29289 19.7071C5.48043 19.8946 5.73478 20 6 20C6.26522 20 6.51957 19.8946 6.70711 19.7071C6.89464 19.5196 7 19.2652 7 19V1C7 0.734784 6.89464 0.48043 6.70711 0.292893C6.51957 0.105357 6.26522 0 6 0ZM16 14C15.7348 14 15.4804 14.1054 15.2929 14.2929C15.1054 14.4804 15 14.7348 15 15V19C15 19.2652 15.1054 19.5196 15.2929 19.7071C15.4804 19.8946 15.7348 20 16 20C16.2652 20 16.5196 19.8946 16.7071 19.7071C16.8946 19.5196 17 19.2652 17 19V15C17 14.7348 16.8946 14.4804 16.7071 14.2929C16.5196 14.1054 16.2652 14 16 14ZM11 6C10.7348 6 10.4804 6.10536 10.2929 6.29289C10.1054 6.48043 10 6.73478 10 7V19C10 19.2652 10.1054 19.5196 10.2929 19.7071C10.4804 19.8946 10.7348 20 11 20C11.2652 20 11.5196 19.8946 11.7071 19.7071C11.8946 19.5196 12 19.2652 12 19V7C12 6.73478 11.8946 6.48043 11.7071 6.29289C11.5196 6.10536 11.2652 6 11 6Z" fill="#C8CACB"/>
                                    </svg>
                                    </span>
                                </div>
                            </header>
                            <div className="pryce-block__body">
                                <p className="pryce-block__pryce">{device.price + ' ₴'}</p>
                                <div className="pryce-block__buttons">
                                    <button className="pryce-block__buy">В корзину</button>
                                    <button className="pryce-block__basket">Купить в 1 клик</button>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>}
                <h1 className="h1">Характеристики</h1>
                {device && device.descriptions.map(x => 
                <div className="descriptions-card">
                    <p className="descriptions-card__title">{x.title}</p>
                    <p className="descriptions-card__value">{x.description}</p>
                </div>
                )}
            </div>
            
        </>
    )
}

export default ProductDiscription