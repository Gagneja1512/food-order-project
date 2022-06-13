import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css'
import { useContext , useEffect , useState } from 'react';
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {

    const [btnIsHighlighted , setBtnIsHighLighted] =  useState(false)

    const cartCtx = useContext(CartContext) ;

    const numberOfCartItems = cartCtx.items.reduce((curNumber , item) => {
        return curNumber + item.amount ;
    } , 0) ;

    const {items} = cartCtx ;

    const btnclasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''} ` ;
    useEffect(() => {
        if(items.length === 0)
        {
            return ;
        }

        setBtnIsHighLighted(true) ;

        const timer = setTimeout(() => {
            setBtnIsHighLighted(false) ;
        } , 300) ;


        return () => {
            clearTimeout(timer) ;
        }
    } , [items]) ;

    return (
        <button className={btnclasses} onClick={props.onclick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
};

export default HeaderCartButton;