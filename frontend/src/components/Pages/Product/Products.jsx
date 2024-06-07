import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Loader, ProductCard} from '../../index';
import { fetchProducts } from '../../../features/product/productSlice';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Products = () => {
    
    const dispatch = useDispatch();
    const { products, error, loading, productCount, resultPerPage} = useSelector(state => state.products);
    const {keyword} = useParams();
    const [page , setPage] = useState(1);
    

    useEffect(() => {
        dispatch(fetchProducts({keyword,page}))
        },[dispatch,keyword,page])
        
    const handlePageChange = (event,value) => {
        setPage(value);
    }
    
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

                {/* Pagination */}
                {!(resultPerPage >= productCount) && <div className='w-full flex justify-center my-8'>
                    <Stack spacing={2}>
                        <Pagination  shape='rounded' color='primary' count={Math.ceil(productCount/resultPerPage)} page={page} onChange={handlePageChange} />
                    </Stack>
                </div>}
            </div> 
        }
        </>
    )
}

export default Products
