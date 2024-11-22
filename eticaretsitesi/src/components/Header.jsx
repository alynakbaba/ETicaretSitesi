import React, { useState } from 'react';
import '../css/Header.css'
import { FaSearch } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { LuShoppingBasket } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';
import { useDispatch } from 'react-redux';

function Header() {
    const [theme, setTheme] = useState(false)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {products} = useSelector((store) => store.basket)

    const changeTheme = () => {
        const root = document.getElementById('root');
        if (theme){
            root.style.backgroundColor = 'black';
            root.style.color = '#fff';
        }else{
            root.style.backgroundColor = '#fff';
            root.style.color = 'black';
        }
        setTheme(!theme);
    }
  return (
    <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>

        <div className="flex-row" onClick={()=>navigate("/")}>
            <img className='logo' src="./src/images/logo.png" />
            <p className='logo-text'>A∀</p>
        </div>

        <div className='flex-row'>
            <input className='search-input' type='text' placeholder='Ara'/>
            <div className='search-icon'>
                <FaSearch />
            </div>
            
            <div>
                {theme ? <FaMoon className='icon' onClick={changeTheme}/>:<IoIosSunny className='icon' onClick={changeTheme}/>}
                <Badge onClick={()=>dispatch(setDrawer())} badgeContent={products.length} color="error">
                    <LuShoppingBasket style={{marginRight:'6px'}} className='icon'/>
                </Badge>
                
            </div>
            
        </div>
    </div>
  )
}

export default Header