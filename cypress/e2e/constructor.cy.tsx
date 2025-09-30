describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиентов', () => {
    it('Добавление ингредиента в конструктор', () => {
      // Находим первый ингредиент типа "bun" и кликаем по нему
      cy.get('[class*="burger-ingredients"]').find('[class*="ingredient"]').eq(0).click();
      cy.get('[class*="modal"]').should('be.visible');
      cy.get('[class*="modal"]').find('[class*="close"]').click();
      
      // Проверяем, что булка добавлена в конструктор
      cy.get('[class*="burger-constructor"]').find('[class*="constructor-element"]').contains('top');

      // Находим первый ингредиент типа "main" и кликаем по нему
      cy.get('[class*="burger-ingredients"]').find('[class*="ingredient"]').eq(1).click();
      cy.get('[class*="modal"]').should('be.visible');
      cy.get('[class*="modal"]').find('[class*="close"]').click();
      
      // Проверяем, что начинка добавлена в конструктор
      cy.get('[class*="burger-constructor"]').find('[class*="constructor-element"]').should('have.length.greaterThan', 1);
    });
  });

  describe('Работа модальных окон', () => {
    it('Открытие и закрытие модального окна ингредиента', () => {
      // Открываем модальное окно
      cy.get('[class*="burger-ingredients"]').find('[class*="ingredient"]').eq(0).click();
      cy.get('[class*="modal"]').should('be.visible');

      // Закрываем по крестику
      cy.get('[class*="modal"]').find('[class*="close"]').click();
      cy.get('[class*="modal"]').should('not.exist');
    });

    it('Закрытие модального окна по оверлею', () => {
      // Открываем модальное окно
      cy.get('[class*="burger-ingredients"]').find('[class*="ingredient"]').eq(0).click();
      cy.get('[class*="modal"]').should('be.visible');

      // Закрываем по оверлею
      cy.get('[class*="modal"]').find('[class*="overlay"]').click({ force: true });
      cy.get('[class*="modal"]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('Оформление заказа и отображение номера', () => {
      // Мокаем токены и данные пользователя
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
      
      // Мокаем создание заказа
      cy.intercept('POST', 'api/orders', {
        success: true,
        name: 'test_order',
        order: {
          number: 12345
        }
      }).as('createOrder');

      // Добавляем ингредиенты
      cy.get('[class*="burger-ingredients"]').find('[class*="ingredient"]').eq(0).click();
      cy.get('[class*="modal"]').find('[class*="close"]').click();
      cy.get('[class*="burger-ingredients"]').find('[class*="ingredient"]').eq(1).click();
      cy.get('[class*="modal"]').find('[class*="close"]').click();

      // Кликаем по кнопке "Оформить заказ"
      cy.get('[class*="button_type_primary"]').contains('Оформить заказ').click();

      // Проверяем, что модальное окно открылось и отображается правильный номер
      cy.get('[class*="modal"]').should('be.visible');
      cy.get('[class*="order-details"]').find('[class*="digits-default"]').should('have.text', '12345');

      // Закрываем модальное окно
      cy.get('[class*="modal"]').find('[class*="close"]').click();
      cy.get('[class*="modal"]').should('not.exist');

      // Проверяем, что конструктор пуст
      cy.get('[class*="burger-constructor"]').find('[class*="constructor-element"]').should('have.length', 0);
    });
  });
});
