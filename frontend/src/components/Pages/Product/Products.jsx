import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Loader, ProductCard} from '../../index';
import { fetchProducts } from '../../../features/product/productSlice';

const Products = () => {
    
    const dispatch = useDispatch();
    const { products, error, loading, productCount} = useSelector(state => state.products);
    
    useEffect(() => {
        dispatch(fetchProducts())
    },[dispatch])

    if(error || productCount === 0){
        return <h1>No Product Found</h1>
    }


    return (
        <>
        { loading ? 
            <Loader />
             : 
            <div>
                <div className='heading'>
                    <h1 className='text-center text-3xl font-bold'>Products</h1>
                </div>

                <div className='flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4'>
                    {products.map((product) => (
                        <ProductCard product={product} />
                    ))}
                </div>

            </div> 
        }
        </>
    )
}

export default Products
