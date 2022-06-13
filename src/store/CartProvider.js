import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartstate = {
    items : [] ,
    totalAmount : 0 ,
}

const cartReducer = (state , action) => {
    if(action.type === 'ADD')
    {
        const updatedItems = state.items.concat(action.item) ;
        const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount ;
        return {
            items : updatedItems ,
            totalAmount : updatedTotalAmount ,
        }
    }
    return defaultCartstate ;
}

const CartProvider = (props) => {
    const [cartState , dispatchCartAction] = useReducer(cartReducer , defaultCartstate) ;

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type : 'ADD' , item : item}) ;
    } 

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type : 'REMOVE' , id : id}) ;
    } 

    const cartContext = {
        items : cartState.items,
        totalAmount : cartState.totalAmount ,
        addItem : addItemToCartHandler,
        removeItem : removeItemFromCartHandler,
    }

    return (
        <CartContext.Provider value={cartContext} >
            {props.children}
        </CartContext.Provider>
    )
};

export default CartProvider ;