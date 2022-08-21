import './BlockForm.scss'

export const BlockForm = ({title, className, children}) => {
    return (
        <>
            <div className={`fomr ${className}`}>
                <h2 className={`fomr__title ${className}__title`}>{title}</h2>
                    {children}
            </div>
        </>
    )
}