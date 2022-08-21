import { forwardRef } from "react"
import './Input.scss'

export const Input = forwardRef(({name, label, errors, className, ...rest}, ref) => {
    return (
        <>
          <label className={`input__label ${className}__label`} htmlFor={name}>{label}</label>
            <input className={`input ${className}`} name={name} placeholder={label} {...rest} ref={ref}/>
            <p>{errors?.[name] && <p>{errors[name].message}</p>}</p>
        </>
    );
})