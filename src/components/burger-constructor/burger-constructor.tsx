/* prettier-ignore */
/* eslint-disable */
import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../services/slices/userSlice';
import { clearConstructor, setOrderRequest, setOrderModalData } from '../../services/slices/burgerConstructorSlice';
import { orderBurgerApi } from '../../utils/burger-api';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { RootState } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора СДЕЛАНО */
  const constructorItems = useSelector((state: RootState) => 
    state.burgerConstructor.constructorItems
  );
  const orderRequest = useSelector((state: RootState) => 
    state.burgerConstructor.orderRequest
  );
  const orderModalData = useSelector((state: RootState) => 
    state.burgerConstructor.orderModalData
  );
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    console.log('onOrderClick сработало');
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!constructorItems.bun || orderRequest) return;
    
    // Собираем массив ID ингредиентов для заказа
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item: TConstructorIngredient) => item._id),
      constructorItems.bun._id // Вторая булка
    ];
    
    // Устанавливаем состояние запроса
    dispatch(setOrderRequest(true));
    
    // Отправляем запрос на создание заказа
    orderBurgerApi(ingredientIds)
      .then((data) => {
        // Успешный ответ - показываем модальное окно с данными заказа
        dispatch(setOrderModalData(data.order));
        // Очищаем конструктор
        dispatch(clearConstructor());
      })
      .catch((error) => {
        console.error('Ошибка при оформлении заказа:', error);
        // Здесь можно установить ошибку в состояние, если нужно
      })
      .finally(() => {
        // Сбрасываем состояние запроса
        dispatch(setOrderRequest(false));
      });
  };
  
  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
  };

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
