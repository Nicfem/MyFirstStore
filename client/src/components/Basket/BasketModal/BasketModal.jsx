import NewBasketSVG from './../../../assets/svg/ShoppingCart.svg'

export const BasketModal = () => {

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