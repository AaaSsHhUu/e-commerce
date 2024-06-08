import React, { useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/product/productSlice";
import {ProductCard,Metadata,Loader} from '../../index';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { banner1, banner2, banner3 } from "../../../assets";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector((state) => state.products);

  useEffect(() => {
    const keyword = "";
    const page = 1;
    dispatch(fetchProducts({keyword,page}));
  }, [dispatch,error]);
    
  return (
    <>
      {loading ?
        <Loader /> 
        : 
        <>
          <Metadata title={"ECOMMERCE"} />
          <div className="max-w-full h-[60vh]  mb-4 relative">
              <HomeCarousel />
          </div>
          
          <div className="heading">
              <h1 className="text-3xl font-bold text-center">Products</h1>
          </div>

          {/* Products */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6">
            {products &&
              products.map((product) => {
                // console.log(product);
                return <ProductCard product={product} />;
              })}
          </div>
        </>
        }
    </>
  );
};

export default Home;

const HomeCarousel = () => {
  const options = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true,
    autoplaySpeed : 3000,
    arrows : false,
    // prevArrow : <GrPrevious color="black" />,
    // nextArrow : <GrNext color="black" />
  };
    return (
        <Slider {...options} className="home">
            <div>
                <img src={banner1} alt="banner image" className="h-[60vh] w-full" />
            </div>
            <div>
                <img src={banner2} alt="banner image" className="h-[60vh] w-full" />
            </div>
            <div>
                <img src={banner3} alt="banner image" className="h-[60vh] w-full" />
            </div>
        </Slider>
    )
}
