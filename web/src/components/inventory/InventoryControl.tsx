import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectItemAmount, setItemAmount } from '../../store/inventory';
import { DragSource } from '../../typings';
import { onUse } from '../../dnd/onUse';
import { onGive } from '../../dnd/onGive';
import { fetchNui } from '../../utils/fetchNui';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Locale } from '../../store/locale';
import { IconButton, Button } from '@mui/material';
import UsefulControls from './UsefulControls';
import usePng from '../../public/use.png';
import logo from '../../public/logo.png';

const InventoryControl: React.FC = () => {
  const itemAmount = useAppSelector(selectItemAmount);
  const dispatch = useAppDispatch();

  const [infoVisible, setInfoVisible] = useState(false);

  const [, use] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onUse(source.item);
    },
  }));

  const [, give] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onGive(source.item);
    },
  }));

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.valueAsNumber % 1 !== 0 || isNaN(event.target.valueAsNumber) || event.target.valueAsNumber < 0)
      event.target.valueAsNumber = 0;
    dispatch(setItemAmount(event.target.valueAsNumber));
  };

  return (
    <>
      <UsefulControls infoVisible={infoVisible} setInfoVisible={setInfoVisible} />
      <div className="inventory-control">
        <div className="inventory-control-wrapper">
          <div className='logo-wrapper'>
            <img src={logo} className="server-logo" alt="" />
          </div>
          <input className="inventory-control-input" type="number" defaultValue={itemAmount} onChange={inputHandler} />
          <Button ref={use} style={{backgroundImage:`url(${usePng})`, backgroundSize:"cover", width:"100px", height:"100px"}}></Button>
          <button className="inventory-control-button" ref={give}>
            {Locale.ui_give || 'Give'}
          </button>
          <button className="inventory-control-button" onClick={() => fetchNui('exit')}>
            {Locale.ui_close || 'Close'}
          </button>
        </div>
      </div>

      <IconButton className="useful-controls-button" size="large" onClick={() => setInfoVisible(true)}>
        <FontAwesomeIcon icon={faInfoCircle} />
      </IconButton>
    </>
  );
};

export default InventoryControl;
