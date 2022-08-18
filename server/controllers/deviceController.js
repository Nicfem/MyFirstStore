const Product = require('../models/Product')
const uuid = require('uuid')
const path = require('path')
const ProductOptions = require('../models/ProductOptions')




class DeviceController {
    async getAll (req, res) {
        let {brand, type, page, limit} = req.query

        let option = req.query
        
        let keys = Object.keys(option)

        let value = Object.values(option)

        let newOption = []   

        let testOption = []
 
        for(let i = 0; i < keys.length; i++) {
            console.log(keys[i])
            if(keys[i] == 'type' || 'page' || 'limit') {
                console.log('deteckted' + keys[i])
            }
            if(keys[i] == 'type') {
                continue
            }
            if(keys[i] == 'page') {
                continue
            }
            if(keys[i] == 'limit') {
                continue
            }
            let option = {'descriptions' : {'$elemMatch' : {'title' : keys[i], 'description' : ''}}}
            let option_value = value[i].split(',')
            
            for(let x = 0; x < option_value.length; x++) {

                let copyOption = JSON.parse(JSON.stringify(option))
                copyOption.descriptions.$elemMatch.description = option_value[x]
                newOption.push(copyOption)
            }  
            testOption.push({"$or" : newOption})
            
            newOption = []
        } 

        let Typedata = []
        type && type.split(',').map(u => Typedata.push(u))
        let skip = 5
        page *= skip
        
        if(type == undefined) {
            const data = await Product.find().skip(page).limit(limit)
            res.send({data})
            return
        }

        if(testOption != '') {
            // const data = await Product.find({'$and': [
                // {"$or" : [
                //     {'descriptions' : {'$elemMatch' : {'title' : 'Количество ядер', 'description' : '6'}}},
                //     {'descriptions' : {'$elemMatch' : {'title' : 'Количество ядер', 'description' : '12'}}},
                // ]}, 
                // {"$or" : [
                //     {'descriptions' : {'$elemMatch' : {'title' : 'Количество потоков', 'description' : '12'}}},
                //     {'descriptions' : {'$elemMatch' : {'title' : 'Количество потоков', 'description' : '6'}}},
                // ]}, 
                // {'descriptions' : {'$elemMatch' : {'title' : 'Тип разъема', 'description' : 'Socket 1151'}}}
                 
                // {"$or" : [
                //     {'descriptions' : {'$elemMatch' : {'title' : 'Количество потоков', 'description' : '12'}}},
                //     {'descriptions' : {'$elemMatch' : {'title' : 'Количество потоков', 'description' : '6'}}},
                // ]}, 
                // {'descriptions' : {'$elemMatch' : {'title' : 'Тип разъема', 'description' : 'Socket 1151'}}}
            // ]})
            const data = await Product.find({'$and': testOption, type : type})
            res.send({data})
            
        }
        if(testOption == '') {
            const data = await Product.find({type : type})
            res.send({data})
        }
        
        //test2

        // if (!brand && !type) {
        //     try {
        //         const data = await Product.find().skip(page).limit(limit)
        //         const length = data.length
        //         res.send({data, length})
        //     } catch(e) {
        //         console.log(e)
        //     }
        // }
        // if (brand && !type) {
        //     try {
        //         const data = await Product.find({'brand': brand}).skip(page)
        //         res.send(data)
        //     } catch (e) {
        //         console.log(e)
        //     }  
        // }
        // if (!brand && type) {
        //     try {
        //         const data = await Product.find({'type': Typedata}).skip(page)
        //         const length = data.length
        //         res.send({data, length})
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }
        // if (brand && type) {
        //     try {
        //         const data = await Product.find({'brand': brand, 'type': type}).skip(page)
        //         console.log(data)
        //         res.send(data)
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }
        
    }

    async create(req, res) {
        try { 
            const {type, brand, device, description, price} = req.body
            const parseDescription = JSON.parse(description)
            const img = req.files.file

            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            
            const product = new Product({type: type, brand: brand, device: device, descriptions : parseDescription, img: fileName, price: price})
            console.log(product)
            await product.save()
        } catch(e) {
            console.log(e)
        }
    }

    async getOne (req, res) {
        console.log('res')
        const {id} = req.params
        try {
            const data = await Product.findById(id)
            res.send(data)
        } catch (e) {
            console.log(e)
        }

    }

    async delete (req, res) {

    }
    async getOption (req, res) {
        const {type} = req.query
        const data = await ProductOptions.findOne({type})
        res.send(data)
    }

    async getOptionAll (req, res) {
        const data = await ProductOptions.find()
        res.send(data)
    }

    async createOption (req, res) {
        const {type, descriptions} = req.body
        const dataOption = await ProductOptions.findOne({type})
        if(dataOption) {
            res.json('Вы долбаеб')
            return
        }
        for(let i = 0; i < descriptions.length; i++) {
            descriptions.map(x => {
                delete x._id
            })

            descriptions[i].option_value.map(x => {
                delete x._id
            })
        }
        const data = new ProductOptions({type, descriptions})
        
        await data.save()
        res.send(data)
    }

    async updateOption (req, res) {
        const {type, descriptions} = req.body
        const data = await ProductOptions.findOne({type})
        for(let i = 0; i < descriptions.length; i++) {
            descriptions.map(x => {
                delete x._id
            })

            descriptions[i].option_value.map(x => {
                delete x._id
            })
        }
        data.descriptions = descriptions
        data.save()
    }

    async getAllDeviceById (req, res) {
        const {id} = req.query
        if(id.length == 0) {
            return res.json([])
        }
        const option = id.split(',')
        const data = await Product.find({_id : option})
        res.send(data)
    }

    async getSearchDevice (req, res) {
        const {device} = req.params
        const data = await Product.find({$text: {$search: `\"${device}\"`}}, {descriptions : 0, type: 0, brand: 0})
        return res.send(data)
    }
}

module.exports = new DeviceController()