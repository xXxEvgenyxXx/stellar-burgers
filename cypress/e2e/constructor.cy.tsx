// cypress/e2e/constructor.cy.tsx
describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.visit('/');
    
    // Настройка перехвата для всех тестов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиентов', () => {
    it('Добавление ингредиента в конструктор', () => {
      // Находим первый ингредиент и кликаем по нему
      cy.get('[data-cy=ingredient-category-buns]').contains('Добавить').click();
      
      // Проверяем, что булка добавлена в конструктор
      cy.get('[data-cy=constructor-bun-top]').should('exist');
      cy.get('[data-cy=ingredient-category-mains]').should('exist');

      // Находим следующий ингредиент и кликаем по нему
      cy.get('[data-cy=ingredient-category-mains]').click();
      
      // Проверяем, что начинка добавлена в конструктор
      cy.get('.constructor-element').should('exist');
    });
  });

  describe('Работа модальных окон', () => {
    it('Открытие и закрытие модального окна ингредиента', () => {
      // Открываем модальное окно
      cy.get('[data-cy=ingredient-category-buns]').get('[data-cy=ingredient-item]').eq(0).click();

      cy.get('[data-cy=modal]').should('exist');

      cy.get('[data-cy=modal-close]').click();
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
      cy.get('[data-cy=ingredient-category-buns]').get('[data-cy=ingredient-item]').contains('Добавить').click();
      cy.get('[data-cy=ingredient-category-mains]').get('[data-cy=ingredient-item]').contains('Добавить').click();

      // Кликаем по кнопке "Оформить заказ"
      cy.get('[data-cy=order-button]').click();

      // Проверяем, что модальное окно открылось и отображается правильный номер
      cy.get('[data-cy=modal]').should('exist');
      cy.get('[data-cy=modal]').contains('123456');

      // Закрываем модальное окно
      cy.get('[data-cy=modal-close]').click();
      cy.get('[data-cy=modal]').should('not.exist');

      // Проверяем, что конструктор пуст
      cy.get('[data-cy=constructor-bun-top]').should('not.exist');
      cy.get('[data-cy=constructor-ingredient]').should('have.length', 0);
    });
  });
});
