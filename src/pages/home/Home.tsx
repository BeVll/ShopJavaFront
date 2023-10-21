import React, { useEffect, useState } from 'react'
import Dark from '../../utils/Theme/Dark';
import Light from '../../utils/Theme/Light';
import { useTheme } from '../../context/ThemeContext';
import './Home.scss';
import Story from '../../components/story/Story';
import Post from '../../components/post/Post';
import { IProductModel } from '../../utils/Types/product';
import ProductService from '../../services/ProductService';
import ProductItem from '../../components/product/ProductItem';

export default function Home() {
  const { theme } = useTheme();
  const themeColors = theme == "dark" ? Dark : Light;
  document.title = "Home | FladeUp"

  const [products, setProducts] = useState<IProductModel[]>();

  useEffect(() => {
    ProductService.getProducts()
    .then(res => {
      setProducts(res.data);
    })

    return () => {

    }
  }, [])

  return (
    products ?
    <div className='homePage'>
      <div className='productsBlock'>
        {products.map(p => (
          <ProductItem product={p}/>
        ))}
      </div>
    </div>
    :
    <></>
  )
}
