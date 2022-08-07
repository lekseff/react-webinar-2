import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";

import {getCurrencyPrice} from '../../utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const callbacks = {

    // onClick: useCallback(() => {
    //   props.onSelect(props.item.code);
    //   if (!props.item.selected) {
    //     setCount(count + 1);
    //   }
    // }, [props.onSelect, props.item, setCount, count]
    // ),

    onClick: useCallback((e) => {
      e.stopPropagation();
      props.onClick(props.item.code)
    }, [props.onClick, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
        {/* {count ? ` | Выделялось ${count} ${plural(count, 'раз', 'раза', 'раз')}` : null} */}
      </div>
      {/* {!!props.item.price && <div className={cn('price')}>
        {props.item.price} ₽
      </div>} */}
      <div className={cn('price')}>
        {getCurrencyPrice(props.item.price)}
      </div>
      {!!props.item.count && <div className={cn('count')}>
          {props.item.count} шт
      </div>}
      
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={callbacks.onClick}>
          {props.btnName}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired
}

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {}
}

export default React.memo(Item);
