import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import PageContainer from './container/PageContainer'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux'
import { setDrawer, calculateBasket } from './redux/slices/basketSlice'

function App() {
  
  const {products, drawer, totalAmount} = useSelector((store) => store.basket)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [dispatch])

  return (
    <div>
      <PageContainer>
        
        <Header />
        <RouterConfig />  
        <Loading />
        <Drawer className='drawer' sw={{padding:'20px'}} onClose={()=> dispatch(setDrawer())} anchor='right' open={drawer}>
          {
            products && products.map((product) => {
              return (
                <div key={product.id}>
                  <div className='flex-row' style={{padding:'20px'}}>
                    <img style={{marginRight:'5px'}} src={product.image} width={50} height={50}/>
                    <p style={{width:'320px', marginRight:'5px'}}>{product.title}({product.count})</p>
                    <p style={{fontWeight:'bold', marginRight:'10px', width:'70px'}}>{product.price} TL</p>
                    <button style={{padding:'5px', borderRadius:'5px', backgroundColor:'rgb(176, 18, 18)', border:'none', color:'#fff', width:'50px'}}>Sil</button>
                  </div>
                  
                </div>
              )
            })
          }
          <div>
            <p style={{marginLeft: '20px'}}>Toplam Tutar: {totalAmount} TL</p>
          </div>
          <div>
            <button className='sepet-button' style={{marginLeft: '20px', fontSize: '15px', fontWeight:'bold'}}>Sepeti Onayla</button>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  )
}

export default App
