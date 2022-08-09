import loader from '../img/Spinner-1.4s-277px.svg'

export const Loader = () => {

    return (
        <>
            <div style={{
                'width' : '100%',
                'height' : '100%',
                'display' : 'flex',
                'justifyContent' : 'center',
                'alignItems' : 'center'
                }}>
                    <img src={loader}/>
            </div>
        </>
    )
}