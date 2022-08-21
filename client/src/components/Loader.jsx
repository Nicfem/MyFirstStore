import loader from '../assets/svg/Spinner.svg'

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