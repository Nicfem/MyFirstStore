import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetOptionAllQuery } from "../../../../Redux/Device/deviceAPI"
import { useGetTypesQuery } from "../../../../Redux/Type/typeAPI"
import { setFormOption, addNewOption, changOptionTitle, addHandlOptionValue, changOptionValue, deliteOption, deliteTitle } from "../../../../Redux/Admin/FormFilter/FormFilter"
export const FormFilter = () => {

    const dispath = useDispatch()

    const formOption = useSelector(state => state.formFilter.formOption)

    const {data : OptionAll} = useGetOptionAllQuery()
    const {data: types = []} = useGetTypesQuery()

    const [update, setUpdate] = useState(false)
    
    const addOptionType = (e) => {
        let filter = OptionAll.filter(x => x.type == e)
        if(filter.length == 0) {
            dispath(setFormOption({
                type: e,
                descriptions : []
            }))
            setUpdate(false)
        } else {
            dispath(setFormOption(JSON.parse(JSON.stringify(filter[0])))) 
            setUpdate(true)
        }
    }

    const addHandlTypes = (id) => {
        dispath(addHandlOptionValue(id))
    }

    const changOptionTitleTEST = (value, id) => {
        dispath(changOptionTitle({value : value, id : id}))
    }

    const DeliteOptionValue = (id, title_id) => {
        dispath(deliteOption({id, title_id}))
    }

    const DeliteOptionTitle = (title_id) => {
        dispath(deliteTitle({title_id}))
    }

    const changHandlTypes = (value, id, arr) => {
        dispath(changOptionValue({value, id, arr})) 

    }

    const addOptiontitle = () => {
        dispath(addNewOption())
    }

    const UpdataHandOption = () => {
        fetch('http://localhost:5000/api/Product/brand/option', {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body:  JSON.stringify(formOption)
        })
    }

    const createHandlForm = () => {
        fetch('http://localhost:5000/api/Product/brand/option', {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body:  JSON.stringify(formOption)
        })
    }

    console.log(formOption)

    return (
        <>
            <div className='admin-form card'>
                <h1>Форма для сортировки товаров</h1>
                <select onChange={e => addOptionType(e.target.value)} value={formOption.type}>
                    <option>Выберите тип</option>
                    {types && types.map(item => <option key={item._id} >{item.type}</option>)}
                </select>

                {formOption.descriptions && formOption.descriptions.map(x =>
                <div style={{"display" : 'flex'}}>
                    <div style={{
                                "display" : "flex",
                                "alignItems" : "center",
                                "marginBottom" : "5px",
                                "top" : "0",
                                "height" : "26px"
                            }}>
                        <input placeholder='Введите название' value={x.option_title} onChange={(e) => changOptionTitleTEST(e.target.value, x._id)}></input> 
                        <button style={{"marginLeft" : "5px"}} className='deliteButtonValue' onClick={() => DeliteOptionTitle(x._id)}></button> 
                    </div>
                    <div>
                        {x.option_value.map(y => 
                            <div style={{
                                "display" : "flex",
                                "alignItems" : "center",
                                "marginBottom" : "5px"
                            }}  >
                                <input 
                                    style={{"marginLeft" : "15px"}} 
                                    placeholder='Введите характеристику'
                                    id={y.id}
                                    value={y.value}
                                    onChange={(e) => changHandlTypes(e.target.value, y._id ? y._id : y.id, x.option_title)} 
                                > 
                                </input>    
                                <button style={{"marginLeft" : "5px"}} className='deliteButtonValue' onClick={() => DeliteOptionValue(y._id, x._id)}></button>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => addHandlTypes(x._id)}
                    >Добавить свойство</button>
                </div>    
                )}
                <button onClick={addOptiontitle}>Добавить фильтр</button>
                {update ? <button onClick={UpdataHandOption}>Обновить</button> : <button onClick={createHandlForm}>Создать</button> }
            </div>
        </>
    )
}