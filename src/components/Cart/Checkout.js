import { useRef, useState } from 'react'
import classes from './Checkout.module.css'

const isEmpty = value => value.trim() === ''
const isFiveChar = value => value.trim().length === 5

const Checkout = (props) => {
    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalCodeInputRef = useRef()
    const cityInputRef = useRef()

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    })

    const confirmHandler = (event) => {
        event.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostalCode = postalCodeInputRef.current.value
        const enteredCity = cityInputRef.current.value

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredPostalCodeIsValid = isFiveChar(enteredPostalCode)

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid,
        })

        const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredPostalCodeIsValid && enteredStreetIsValid

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            city: enteredCity,
            street: enteredStreet,
            postalCode: enteredPostalCode,
        })
    }

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name.</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid street.</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
                <label htmlFor='postal'>Postal code</label>
                <input type='text' id='postal' ref={postalCodeInputRef} />
                {!formInputsValidity.postalCode && <p>Please enter a valid Postal Code(5 Characters long)</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city name</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;