const INGREDIENT_CATEGORY_BUNS = '[data-cy=ingredient-category-buns]';
const INGREDIENT_CATEGORY_MAINS = '[data-cy=ingredient-category-mains]';
const INGREDIENT_CATEGORY_SAUCES = '[data-cy=ingredient-category-sauces]';
const INGREDIENT_ITEM = '[data-cy=ingredient-item]';
const CONSTRUCTOR_BUN_TOP = '[data-cy=constructor-bun-top]';
const CONSTRUCTOR_BUN_BOTTOM = '[data-cy=constructor-bun-bottom]';
const CONSTRUCTOR_INGREDIENT = '[data-cy=constructor-ingredient]';
const MODAL = '[data-cy=modal]';
const MODAL_CLOSE = '[data-cy=modal-close]';
const ORDER_BUTTON = '[data-cy=order-button]';

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.visit('/');
    
    // Настройка перехвата для всех тестов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиентов', () => {
    it('Добавление ингредиента в конструктор', () => {
      // Получаем название первого ингредиента в категории булок
      cy.get(INGREDIENT_CATEGORY_BUNS).get(INGREDIENT_ITEM).eq(0).within(() => {
        cy.get('p:first').invoke('text').then((ingredientName) => {
          // Кликаем по кнопке "Добавить" внутри того же элемента
          cy.contains('Добавить').click();
          
          // Проверяем, что в конструкторе появился элемент с названием добавленного ингредиента
          // Проверяем, что булка добавлена в конструктор
          cy.get(CONSTRUCTOR_BUN_TOP).should('exist');
          cy.get(CONSTRUCTOR_BUN_TOP).should('contain', ingredientName);
        });
      });
      
      // Проверяем, что булка добавлена в конструктор
      cy.get(CONSTRUCTOR_BUN_TOP).should('exist');
      
      // Получаем название первого ингредиента в категории начинок
      cy.get(INGREDIENT_CATEGORY_MAINS).get(INGREDIENT_ITEM).eq(0).within(() => {
        cy.get('p:first').invoke('text').then((ingredientName) => {
          // Кликаем по кнопке "Добавить" внутри того же элемента
          cy.contains('Добавить').click();
          
          // Проверяем, что в конструкторе появился элемент с названием добавленного ингредиента
          cy.get(CONSTRUCTOR_INGREDIENT).should('exist');
          cy.get(CONSTRUCTOR_INGREDIENT).should('contain', ingredientName);
        });
      });
    });
  });

  describe('Работа модальных окон', () => {
    it('Открытие и закрытие модального окна ингредиента', () => {
      // Получаем название первого ингредиента в категории булок
      cy.get(INGREDIENT_CATEGORY_BUNS).get(INGREDIENT_ITEM).eq(0).within(() => {
        cy.get('p:first').invoke('text').then((ingredientName) => {
          // Открываем модальное окно
          cy.get('img').click(); // Кликаем на изображение ингредиента

          // Проверяем, что модальное окно открылось и отображаются детали ингредиента
          cy.get(MODAL).should('exist');
          
          // Проверяем, что в модальном окне отображается название именно того ингредиента, на который кликнули
          cy.get(MODAL).should('contain', ingredientName);
          
          // Закрываем по крестику
          cy.get(MODAL_CLOSE).click();
          cy.get(MODAL).should('not.exist');
        });
      });
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      // Мокаем получение пользователя
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      
      // Мокаем создание заказа
      cy.intercept('POST', 'api/orders', { fixture: 'postOrder.json' }).as('createOrder');

      // Устанавливаем токены в localStorage и cookies для авторизации
      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('test-refreshToken')
      );
      cy.setCookie('accessToken', 'test-accessToken');

      // Переходим на нужный URL, чтобы cookies были установлены для правильного домена
      cy.visit('/');
    });

    afterEach(() => {
      // Очищаем localStorage и cookies после каждого теста
      cy.clearLocalStorage();
      cy.clearCookies();
    });

    it('Оформление заказа и отображение номера', () => {
      // Добавляем ингредиенты
      cy.get(INGREDIENT_CATEGORY_BUNS).get(INGREDIENT_ITEM).contains('Добавить').click();
      cy.get(INGREDIENT_CATEGORY_MAINS).get(INGREDIENT_ITEM).contains('Добавить').click();

      // Кликаем по кнопке "Оформить заказ"
      cy.get(ORDER_BUTTON).click();

      // Проверяем, что модальное окно открылось и отображается правильный номер
      cy.get(MODAL).should('exist');
      cy.get(MODAL).contains('123456');

      // Закрываем модальное окно
      cy.get(MODAL_CLOSE).click();
      cy.get(MODAL).should('not.exist');

      // Проверяем, что конструктор пуст
      cy.get(CONSTRUCTOR_BUN_TOP).should('not.exist');
      cy.get(CONSTRUCTOR_INGREDIENT).should('have.length', 0);
    });
  });
});
