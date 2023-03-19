import React from 'react';
import './Items.css';
import Item from "./Item";
import { useState } from 'react';
import { useEffect } from 'react';

function Items({ Details }) {
    let [details, setDetails] = useState([]);

    const items = [];

    useEffect(() => {
        setDetails(Details);
    }, [])

    function itemRender() {
        for (let i = 0; i < details?.length; i++) {
            items.push(<Item
                Number={i + 1}
                Name={details[i].Name}
                Qty={details[i].Qty}
                Unit={details[i].Unit}
                Price={details[i].Price}
                Amount={details[i].Amount}
            />);
        }
    };

    itemRender();

    return (
        items
        // console.log(details)
        // <Item Number="1" Name={details[0].Name} />  
        // details.forin(detail => {
        //     console.log(detail);
        //     // <h1>Hello</h1>
        //     // <pre>{detail}</pre>
        // })

        // <>
        //     <Item Number={1} />
        //     <Item Number={2} />
        // </>
    )
}

export default Items