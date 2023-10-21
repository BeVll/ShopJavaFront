import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import Dark from '../../utils/Theme/Dark';
import Light from '../../utils/Theme/Light';
import { IProductModel } from '../../utils/Types/product';
import './ProductItem.scss';
import { Cart2 } from 'react-bootstrap-icons';

export default function ProductItem({ product }: { product: IProductModel }) {
    const { theme } = useTheme();
    const themeColors = theme == "dark" ? Dark : Light;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [google, setGoogle] = useState(false);
    const { languageItem } = useLanguage();

    return (
        <div className="item" style={{ backgroundColor: themeColors.background }}>
            <img src={`${import.meta.env.VITE_STORAGE_URL + "300_" + product?.images[0].image}`} alt="" className="image" />
            <span className='productName' style={{ color: themeColors.mainText }}>{product.name}</span>
            <span className='productDesctiprion' style={{ backgroundImage: `linear-gradient(180deg,${themeColors.descriptionText} 0%,rgba(0,0,0,0))` }}>{product.description}</span>
            <div className="priceAndBuy">
                <span className="price">{product.price}₴</span>
                <button className='buyButton' style={{ backgroundColor: themeColors.primary }}>
                    <Cart2 size={20}/>
                </button>
            </div>
        </div>
    )
}
