import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlice'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';

function ProductDetails() {
    const {id} = useParams()
    const { products, selectedProduct } = useSelector((store) => store.product)

    const { price, image, title, description } = selectedProduct

    const[count , setCount] = useState(0);

    const dispatch = useDispatch()

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1)
    }
    }

    const addBasket = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count

        }

        dispatch(addToBasket(payload))
        dispatch(calculateBasket())
    }


    useEffect(() =>{
        getProductById()
    }, [])

    const getProductById = () => {
        products && products.map((product)=>{
            if(product.id == id){
                dispatch(setSelectedProduct(product))
            }
        })
    }

    return (
        <div style={{marginTop: '85px', display: 'flex', flexDirection:'row', justifyContent:'center'}}>
            <div style={{marginRight: '40px'}}>
                <img src={image} width={400} height={500} />
            </div>
            <div>
                <h1>{title}</h1>
                <h3>{description}</h3>
                <h1 style={{fontSize: '45px'}}>{price} ₺</h1>
                <div className="plus-minus">
                    <CiCirclePlus onClick={increment} style={{marginLeft:'15px'}}/> <span style={{marginLeft: '10px'}}> {count} </span> <CiCircleMinus onClick={decrement}  style={{marginLeft:'15px'}}/>
            </div>
            <div>
                <button onClick={addBasket} className= "sepet-button">Sepete Ekle</button>
            </div>

            </div>
        </div>
    )
}

export default ProductDetails