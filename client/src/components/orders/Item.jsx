import React from 'react';

function Item(props) {
    return (
        <details>
            <summary>Item {props.Number}</summary>
            <ul>
                <li>Name: {props.Name}</li>
                <li>Qty: {props.Qty} {props.Unit}</li>
                <li>Price: {props.Price}</li>
                <li>Amount: {props.Amount}</li>
            </ul>
        </details>
        // console.log(props)
    )
}

export default Item;