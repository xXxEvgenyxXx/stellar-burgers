describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.visit('/');
    
    // Настройка перехвата для всех тестов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
    
    // Настройка перехвата для авторизации (для всех тестов)
    cy.intercept('POST', 'api/auth/token', {
      refreshToken: 'mock_refresh_token',
      accessToken: 'mock_access_token'
    }).as('token');
    
    cy.intercept('GET', 'api/auth/user', {
      user: {
        email: 'test@example.com',
        name: 'Test User'
      }
    }).as('getUser');
  });

  describe('Добавление ингредиентов', () => {
    it('Добавление ингредиента в конструктор', () => {
      // Находим первый ингредиент и кликаем по нему
      cy.get('[data-cy=ingredient-category-buns]').eq(0).click();
      
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
      cy.get('[data-cy=ingredient-category-buns]').eq(0).click();
      
      // Проверяем, что модальное окно открылось
      cy.get('#modals').should('be.visible');

      // Закрываем по крестику
      cy.get('[data-cy=modal-close]').click();
      cy.get('#modals').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('Оформление заказа и отображение номера', () => {
      // Мокаем создание заказа (только для этого теста)
      cy.intercept('POST', 'api/orders', {
        success: true,
        name: 'test_order',
        order: {
          number: 12345
        }
      }).as('createOrder');

      // Добавляем ингредиенты
      cy.get('[data-cy=ingredient-category-buns]').eq(0).click();
      cy.get('[data-cy=modal-close]').click();
      cy.get('[data-cy=ingredient-category-mains]').eq(1).click();
      cy.get('[data-cy=modal-close]').click();

      // Кликаем по кнопке "Оформить заказ"
      cy.get('[data-cy=order-button]').click();

      // Проверяем, что модальное окно открылось и отображается правильный номер
      cy.get('[data-cy=order-modal]').should('exist');
      cy.get('[data-cy=order-number]').should('have.text', '12345');

      // Закрываем модальное окно
      cy.get('[data-cy=modal-close]').click();
      cy.get('[data-cy=order-modal]').should('not.exist');

      // Проверяем, что конструктор пуст
      cy.get('[data-cy=constructor-bun-top]').should('not.exist');
      cy.get('[data-cy=constructor-ingredient]').should('have.length', 0);
    });
  });
});
