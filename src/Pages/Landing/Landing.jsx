import React from 'react'
import Layouts from '../../components/Layouts/Layouts';

import Catagory from '../../components/Catagory/Catagory';
import Product from '../../components/Catagory/Product/Product';

import CarouselEffect from "../../components/Carousel/Carousel"

function Landing() {
  return (
    <Layouts>
      <CarouselEffect />
      <Catagory />
      <Product />
    </Layouts>
  );
}

export default Landing