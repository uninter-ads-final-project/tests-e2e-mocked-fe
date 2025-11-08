describe('Página de Agenda/Calendário', () => {
    beforeEach(() => {
        cy.visit('/agenda');
    });

    it('deve carregar a página de agenda com sucesso', () => {
        cy.url().should('include', '/agenda');
        cy.get('h1').should('contain', 'Agenda');
    });

    it('deve exibir todos os filtros para staff', () => {
        cy.get('[data-cy-input="filtro-paciente"]').should('exist');
        cy.get('[data-cy-input="filtro-data"]').should('exist');
        cy.get('[data-cy-input="filtro-especialidade"]').should('exist');
        cy.get('[data-cy-input="filtro-status"]').should('exist');
        cy.get('[data-cy-input="filtro-hospital"]').should('exist');
        cy.get('[data-cy-button="aplicar-filtros"]').should('exist');
    });

    it('deve exibir controles de visualização do calendário', () => {
        cy.get('[data-cy-button="visao-semana"]').should('exist');
        cy.get('[data-cy-button="visao-mes"]').should('exist');
        cy.get('[data-cy-button="visao-dia"]').should('exist');
    });

    it('deve exibir calendário com dias e horários', () => {
        cy.get('.calendar-week').should('exist');
        cy.get('.calendar-day').should('have.length', 7);
        cy.contains('Seg');
        cy.contains('Ter');
        cy.contains('Qua');
        cy.contains('Qui');
        cy.contains('Sex');
        cy.contains('Sáb');
        cy.contains('Dom');
    });

    it('deve exibir eventos no calendário', () => {
        cy.get('.calendar-events').should('exist');
        cy.get('.badge').should('exist');
    });

    it('deve exibir lista de consultas do dia', () => {
        cy.contains('Consultas de Hoje');
        cy.get('tbody tr').should('have.length.at.least', 1);
        cy.contains('Maria Santos');
        cy.contains('Pedro Almeida');
    });

    it('deve aplicar filtros na agenda', () => {
        cy.get('[data-cy-input="filtro-especialidade"]').select('Cardiologia');
        cy.get('[data-cy-input="filtro-status"]').select('confirmada');
        cy.get('[data-cy-button="aplicar-filtros"]').click();

        cy.intercept('GET', '/api/agenda/filtrar*', {
            statusCode: 200,
            body: { consultas: [] }
        }).as('aplicarFiltros');

        cy.wait('@aplicarFiltros');
    });

    it('deve mudar visualização do calendário', () => {
        cy.intercept('GET', '/api/agenda?view=semana', {
            statusCode: 200
        }).as('carregarSemana');

        cy.get('[data-cy-button="visao-semana"]').click();
        cy.wait('@carregarSemana');

        cy.intercept('GET', '/api/agenda?view=mes', {
            statusCode: 200
        }).as('carregarMes');

        cy.get('[data-cy-button="visao-mes"]').click();
        cy.wait('@carregarMes');
    });

    it('deve permitir agendar nova consulta para paciente', () => {
        cy.get('[data-cy-button="agendar-consulta"]').click();
        cy.url().should('include', '/marcar-consulta');
    });

    it('deve permitir staff criar nova consulta', () => {
        cy.get('[data-cy-button="nova-consulta"]').should('exist').click();
        cy.get('.modal').should('be.visible');
    });

    it('deve permitir staff gerenciar agenda', () => {
        cy.get('[data-cy-button="gerenciar-agenda"]').click();
        cy.url().should('include', '/gerenciar-agenda');
    });

    it('deve permitir staff bloquear horários', () => {
        cy.get('[data-cy-button="bloquear-horarios"]').click();
        cy.get('.modal').should('be.visible');
    });

    it('deve exibir ações para consultas agendadas', () => {
        cy.get('[data-cy-button="iniciar-consulta"]').should('exist');
        cy.get('[data-cy-button="reagendar-consulta"]').should('exist');
        cy.get('[data-cy-button="confirmar-consulta"]').should('exist');
        cy.get('[data-cy-button="cancelar-consulta"]').should('exist');
    });

    it('deve iniciar consulta agendada', () => {
        cy.intercept('POST', '/api/consultas/1/iniciar', {
            statusCode: 200,
            body: { success: true }
        }).as('iniciarConsulta');

        cy.get('[data-cy-button="iniciar-consulta"]').first().click();
        cy.wait('@iniciarConsulta');
    });

    it('deve confirmar consulta pendente', () => {
        cy.intercept('PUT', '/api/consultas/2/confirmar', {
            statusCode: 200,
            body: { success: true }
        }).as('confirmarConsulta');

        cy.get('[data-cy-button="confirmar-consulta"]').first().click();
        cy.wait('@confirmarConsulta');
    });

    it('deve cancelar consulta', () => {
        cy.intercept('DELETE', '/api/consultas/2/cancelar', {
            statusCode: 200,
            body: { success: true }
        }).as('cancelarConsulta');

        cy.get('[data-cy-button="cancelar-consulta"]').first().click();

        cy.get('.modal').should('be.visible');
        cy.get('[data-cy-button="confirmar-cancelamento"]').click();

        cy.wait('@cancelarConsulta');
    });

    it('deve reagendar consulta', () => {
        cy.intercept('GET', '/api/consultas/2/reagendar', {
            statusCode: 200,
            body: { consulta: {} }
        }).as('carregarReagendamento');

        cy.get('[data-cy-button="reagendar-consulta"]').first().click();
        cy.wait('@carregarReagendamento');
        cy.get('.modal').should('be.visible');
    });

    it('deve exibir diferentes informações baseadas no tipo de usuário', () => {
        cy.intercept('GET', '/api/usuario/tipo', {
            statusCode: 200,
            body: { tipo: 'medico' }
        }).as('carregarTipoUsuario');

        cy.wait('@carregarTipoUsuario');

        cy.get('h1').then($h1 => {
            if ($h1.text().includes('Médica')) {
                cy.get('[data-cy-button="nova-consulta"]').should('be.visible');
                cy.get('[data-cy-button="gerenciar-agenda"]').should('be.visible');
            }
        });
    });

    it('deve carregar dados da agenda via API', () => {
        cy.intercept('GET', '/api/agenda', {
            statusCode: 200,
            body: {
                consultas: [
                    {
                        id: 1,
                        paciente: 'Maria Santos',
                        medico: 'Dr. Carlos Silva',
                        data: '2024-12-28T08:00:00',
                        status: 'confirmada'
                    }
                ]
            }
        }).as('carregarAgenda');

        cy.wait('@carregarAgenda');
        cy.contains('Maria Santos');
    });

    it('deve exibir status das consultas corretamente', () => {
        cy.get('.badge.bg-success').should('contain', 'Confirmada');
        cy.get('.badge.bg-warning').should('contain', 'Pendente');
        cy.get('.badge.bg-danger').should('contain', 'Cancelada');
    });

    it('deve manter layout responsivo da agenda', () => {
        cy.viewport('iphone-6');
        cy.get('.calendar-day').should('be.visible');
        cy.get('[data-cy-button="agendar-consulta"]').should('be.visible');

        cy.viewport('macbook-15');
        cy.get('.calendar-week').should('be.visible');
        cy.get('table').should('be.visible');
    });

    it('deve navegar entre semanas', () => {
        cy.intercept('GET', '/api/agenda?week=previous', {
            statusCode: 200
        }).as('semanaAnterior');

        cy.get('[data-cy-button="semana-anterior"]').click();
        cy.wait('@semanaAnterior');

        cy.intercept('GET', '/api/agenda?week=next', {
            statusCode: 200
        }).as('proximaSemana');

        cy.get('[data-cy-button="proxima-semana"]').click();
        cy.wait('@proximaSemana');
    });
});