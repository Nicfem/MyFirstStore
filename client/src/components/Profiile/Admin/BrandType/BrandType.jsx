import { useState } from "react"
import { useAddBrandMutation } from "../../../../Redux/Brand/brandAPI"
import { useAddTypeMutation } from "../../../../Redux/Type/typeAPI"

export const BrandType = () => {

    const [newBrand, setNewBrand] = useState('')
    const [newType, setNewType] = useState('')

    const [addType] = useAddTypeMutation()
    const [addBrand] = useAddBrandMutation()

    const hendlAddType = async () => {        
        addType({type: newType})
        setNewType('')
    }

    const hendlAddBrand = async () => {
        addBrand({brand: newBrand})
        setNewBrand('')
    }

    return (
        <>
            <div className='admin-addOptions card'>
                <div>
                    <input 
                        className='admin-addOptions__input'
                        onChange={(e) => setNewType(e.target.value)} 
                        value={newType} 
                    />
                    <button 
                        className='admin-addOptions__top-button'
                        onClick={hendlAddType}
                    >Добавить тип</button>
                </div>
                <div>
                    <input 
                        className='admin-addOptions__input'
                        onChange={(e) => setNewBrand(e.target.value)} 
                        value={newBrand}
                    />
                    <button 
                        className='admin-addOptions__top-button'
                        onClick={hendlAddBrand}
                    >Добавить брэнд</button>
                </div>
            </div>
        </>
    )
}