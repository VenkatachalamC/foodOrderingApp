import { createContext } from "react";
import { useState } from "react";
export const cartContext=createContext({
    cart:[],
    add:()=>{},
    remove:()=>{},
    total:()=>{},
    setcart:()=>{}
})

function Cart({children}){
    const [cart,setcart]=useState([])
    function add(item){
        const tmp=cart.filter((it)=>it._id===item._id)
        if(tmp.length===0){
        const newItem={
            _id:item._id,
            count:1,
            item:item
        }
        setcart(prev=>[...prev,newItem])
    }
    else{
        setcart(prev=>{
            const newc=prev.map((it)=>{
                if(it._id===item._id){
                    it.count++;
                }
                return it;
            })
            return newc;
        })
    }
    }
    function remove(item){
        const idx=cart.findIndex(it=>it._id===item._id);
        if(idx!==-1){
        if(cart[idx].count===1){
        setcart(prev=>{return prev.filter((it)=>it._id!=item._id)})
        }
        else{
            setcart(prev=>{
                const newc=prev.map(it=>{
                    if(it._id===item._id){
                        it.count--;
                    }
                    return it;
                })
                return newc;
            })
        }
    }
    }
    function calculateTotal(){
        let tot=0;
        cart.forEach(item=>tot+=item.count*item.item.price)
        return tot;
    }
    return (
        <cartContext.Provider value={{cart:cart,add:add,remove:remove,total:calculateTotal,setcart:setcart}}>
            {children}
        </cartContext.Provider>
    )
}
export default Cart;