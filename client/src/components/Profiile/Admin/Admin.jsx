import './Admin.scss'
import { BrandType } from './BrandType/BrandType'
import { CreateDevice } from './CreateDevice/CreateDevice'
import { FormFilter } from './FormFilter/FormFilter'

export const AdminProfile = () => {
    return (
        <>
            <div className='adminProfile'>
                <div>
                    <BrandType/>
                    <FormFilter/>
                    <CreateDevice/>
                </div>
            </div>
        </>
    )
}