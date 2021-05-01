import React, {useEffect, useState} from 'react';
import './itemList.css';
import Spinner from '../spinner';


function ItemList({getData, onItemSelected, renderItem}) {   
    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data);
            })
            .catch(() => {this.onError()})
    }, [])


    function renderItems(arr) {
        
        return arr.map((item) => {
            
            const {id} = item;
            console.log(item);
            const label = renderItem(item);
            return (
                <li 
                    className="list-group-item" 
                    key={id}
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
        )
        })
    }

    if (!itemList) {
        return <Spinner/>
    }

    const items = renderItems(itemList);
    
    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    ); 
}

export default ItemList;