import NewBasketSVG from './../../../img/NoBasket.svg'


export const BasketModal = ({setActive}) => {

    return (
        <>
            <div className="basketModal">
                <div style={{"width" : "768px", "display" : "flex", "flexDirection" : "column", "alignItems" : "center", "justifyContent" : "center", "height" : "76vh"}}>
                    <img width='500px' src={NewBasketSVG}></img>
                    <p style={{"fontSize" : "36px", "fontWeight" : "bold", "color" : "#2A5275"}}>Корзина пуста</p>
                </div>
            </div>
        </>
    )
}