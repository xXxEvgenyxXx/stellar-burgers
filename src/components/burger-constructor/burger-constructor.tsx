/* prettier-ignore */
/* eslint-disable */
import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../services/slices/userSlice';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора СДЕЛАНО */
  const constructorItems = useSelector((state: any) => 
    state.burgerConstructor?.constructorItems || { bun: null, ingredients: [] }
  );
  const orderRequest = useSelector((state: any) => 
    state.burgerConstructor?.orderRequest || false
  );
  const orderModalData = useSelector((state: any) => 
    state.burgerConstructor?.orderModalData || null
  );
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const onOrderClick = () => {
    console.log('onOrderClick сработало');
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
  };
  
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
