import { useEffect, useState } from 'react'
import logo from './assets/headLogo.jpg'
import cart from './assets/cart-removebg-preview.png'
import a1 from './assets/12.jpg'
import a2 from './assets/11.jpg'
import a3 from './assets/10.webp'
import a4 from './assets/9.jpg'
import a5 from './assets/8.jpg'
import a6 from './assets/7.jpg'
import a7 from './assets/6.jpg'
import a8 from './assets/5.jpg'
import a9 from './assets/4.webp'
import a10 from './assets/3.jpg'
import a11 from './assets/2.jpg'
import a12 from './assets/1.webp'
import './App.css'
import {createPortal} from 'react-dom'
function CartLists ({isAdd,onClose,children}) {
    if (!isAdd) return null;
    
    return createPortal(
              <div className='flex justify-end fixed inset-0 h-screen-min transition-all'>
                  <div className='bg-slate-400 p-5 w-[60%] rounded-xl overflow-scroll'>
                    <button className='bg-slate-900 text-slate-200 px-2 py-1 rounded-full cursor-pointer' onClick={onClose}>X</button>
                    {children}
                  </div>
              </div>,
            document.body
    )
}



function App() {
  let [isAdd,setIsAdd]=useState(false)
  let [proItem,setProItem]=useState([])
  let [isBuy,setIsBuy]=useState(false)
  let [itemCount,setItemCount] = useState(0)

  let [qty,setQty]=useState({})
  const product = [
  { id: 1, name: "Chicken 65", price: 250, img: a1 },
  { id: 2, name: "Meals", price: 150, img: a2 },
  { id: 3, name: "Chocolate Cake", price: 80, img: a3 },
  { id: 4, name: "Chicken Gravey", price: 90, img: a4 },
  { id: 5, name: "Snacks", price: 50, img: a5 },
  { id: 6, name: "Non-Veg Lunch", price: 430, img: a6 },
  { id: 7, name: "Churma", price: 90, img: a7 },
  { id: 8, name: "Curd rice", price: 80, img: a8 },
  { id: 9, name: "Veg Snacks", price: 40, img: a9 },
  { id: 10, name: "Chicken Noodles", price: 250, img: a10 },
  { id: 11, name: "Chicken Lolipop", price: 150, img: a11 },
  { id: 12, name: "Veg Role", price: 50, img: a12 },
];


const cartItem=(products)=>{
  if(!products) return null;
  alert('add your food')
  setItemCount(itemCount+1)
  setProItem(prevPro=>[...prevPro,products])
  setIsBuy(true)
  setQty(1)
}

const handlechange = (id, price, value) => {
  const q = Number(value);
  const p = Number(price);
  if (!Number.isFinite(q) || q < 1) return;

  setQty(prev => ({
    ...prev,
    [id]: {
      qty: q,
      total: p * q
    }
  }));
};

const grandTotal = proItem.reduce((sum, item) => {
  const line = qty[item.id]?.total ?? Number(item.price);
  return sum + line;
}, 0);

const handleDelete = (id) => {
  setProItem(prev =>
    prev.filter(item => item.id !== id)
  );

  setQty(prev => {
    const copy = { ...prev };
    delete copy[id];
    return copy;
  });
};


  return (
    <div>
      <div className='h-screen-min bg-gradient-to-t from-slate-700  via-slate-800  to-slate-700'>
        <header className='flex justify-between px-5 py-2 bg-slate-300 rounded-b-2xl border-double shadow-2xl drop-shadow-[2px_3px_12px]'>
          <div className='flex gap-4 items-center'>
            <img className='w-10 h-10 rounded-[10px]' src={logo} />
            <h1 className=' font-mono text-3xl text-slate-800 shadow-ms drop-shadow-[1px_1px_2px_black]'>Fast Food</h1>
          </div>
          <nav className='flex items-center gap-2'> 
            <img className='w-15 h-15 rounded-[10px] cursor-pointer' onClick={()=>setIsAdd(true)} src={cart} />
            <h1 className='text-2xl'>{itemCount}</h1>
          </nav>
        </header>
        <main className='flex flex-col p-10 gap-6'>
          <h1 className='  font-mono text-3xl text-slate-300 shadow-ms drop-shadow-[1px_1px_5px_white]'>Feed Your Cravings</h1>
            <section className='flex flex-wrap gap-6 justify-center '>
              {
                product.map((product)=>(
                  <div  key={product.id} className='flex flex-col bg-gradient-to-r from-slate-500 via-slate-300 via-slate-300  to-slate-500 w-80 h-100 rounded-2xl border-2 border-slate-100 drop-shadow-[1px_1px_3px_white] overflow-hidden transition-all'>
                    <img src={product.img} className='m-3 p-5 hover:animate-bounce rounded-4xl animate-pulse'/>
                    <div className='flex justify-between'>
                      <div className='flex flex-col ml-5'>
                        <h1 className='font-semibold font-sans text-[20px] text-slate-900'>{product.name}</h1>
                        <p className='font-semibold font-sans text-[20px] text-slate-900'>₹{product.price}</p>
                      </div>
                      <img onClick={()=>cartItem(product)} className='w-20 h-20 p-2 bg-slate-600 mt-2 ml-2 rounded-l-2xl hover:{<h1>Add to cart</h1>} ' src={cart} />
                    </div>
                  </div>
                ))
              }
            </section>
        </main>
        <CartLists isAdd={isAdd} onClose={()=>setIsAdd(false)}>
            <h1 className='flex justify-center font-bold'>Cart Items</h1>
            <section className='flex  flex-col gap-5 mt-5 mb-5'>
              {
                isBuy && proItem.map(items=>(
                  <div key={items.id} className=' flex md:w-100 w-70 gap-3 bg-slate-50 p-2 rounded-2xl border-2 border-slate-900 '> 
                    <img src={items.img} className='md:w-30 w-20 rounded-3xl' />
                    <div className='flex flex-col gap-3 items-stretch'>
                      <h4>{items.name}</h4>
                      <p> Rs.{qty[items.id]?.total ?? items.price}</p>
                      <div className='flex md:justify-between md:gap-20 gap-10'>
                        <input value={qty[items.id]?.qty ?? 1} type="number" min={1}  onChange={(e)=>handlechange(items.id,items.price,e.target.value)} className='w-20 border-2 rounded-2xl px-2' />
                        <button onClick={() => handleDelete(items.id)} className='flex place-self-end bg-red-600 rounded-4xl px-1 text-white'>del</button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </section>
            <div className='flex gap-2'>
              <h1 className='font-semibold'>Total </h1><p>₹{grandTotal}</p>
            </div>
            <button className='flex place-self-end text-slate-100 rounded-3xl p-5 bg-slate-600' onClick={() => (alert("Order Placed successfully"))}>Place Order</button>
        </CartLists>
      </div>
    </div>
  )
}

export default App
