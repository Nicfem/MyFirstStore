import './ModalComponent.scss'

export const ModalComponent = ({active, setActive, children}) => {
    return (
        <>
            <div className={active ? 'modalBasket active' : 'modalBasket'} onClick={() => setActive(false)}>
                <div className={active ? 'modalBasket__content active' : 'modalBasket__content'} onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </>
    )
}