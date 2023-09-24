import React from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import InventoryContext from './InventoryContext';
import { getTotalWeight } from '../../helpers';
import { createPortal } from 'react-dom';

const InventoryGrid: React.FC<{ inventory: Inventory }> = ({ inventory }) => {
  const weight = React.useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items)*1000)/1000 : 0),
    [inventory.maxWeight, inventory.items]
  );

  return (
    <>
      <div className="inventory-grid-wrapper">
        <div>
          <div className="inventory-grid-header-wrapper">
              <div className="name-container">
              <div className="name-icon-container">
                {inventory.type === 'player' && '🎒'}
                {inventory.type === 'shop' && '🛒'}
                {inventory.type === 'container' && '📦'}
                {inventory.type === 'crafting' && '🔧'}
                {inventory.type === 'newdrop' && '📦'}
                {inventory.type === 'drop' && '📦'}
                {inventory.type === 'stash' && '📦'}
                {inventory.type === 'glovebox' && '🚘'}
                {inventory.type === 'trunk' && '🚍'}
              </div>
              <p>{inventory.type === 'newdrop' && 'DROP'}{inventory.type === 'glovebox' && 'GLOVEBOX PLATE :'}{inventory.type === 'trunk' && 'TRUNK PLATE :'} {inventory.label} {inventory.type == 'player' && `- [${inventory.id}]`} </p>
              </div>
              {inventory.type !== 'shop' && 
              <div className='weight-container'>
                <div className='weight-bar-wrapper'>
                  <WeightBar percent={inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0} />
                </div>
                <div className='weight-bar-kg-wrapper'>
                {inventory.maxWeight && (
                  <p>
                    {weight / 1000}/{inventory.maxWeight / 1000}kg
                  </p>
                )}
                </div>
              </div>
              }
          </div>
        </div>
        <div className="inventory-grid-container">
        <>
          {inventory.items.map((item, index) => {
            if(index < 6 && inventory.type==='player') {
              return ''
            }
            return <InventorySlot key={`${inventory.type}-${inventory.id}-${item.slot}`} item={item} inventory={inventory} />
          })}
            {inventory.type === 'player' && createPortal(<InventoryContext />, document.body)} 
          </>
        </div>
      </div>
    </>
  );
};

export default InventoryGrid;
