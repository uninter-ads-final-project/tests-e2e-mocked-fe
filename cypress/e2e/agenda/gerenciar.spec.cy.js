describe('Página de Gerenciar Agenda', () => {
    beforeEach(() => {
        cy.visit('/gerenciar-agenda');
    });

    it('deve carregar a página de gerenciar agenda com sucesso', () => {
        cy.url().should('include', '/gerenciar-agenda');
        cy.get('h1').should('contain', 'Gerenciar Agenda');
        cy.get('.breadcrumb').should('exist');
    });

    it('deve exibir configurações da agenda', () => {
        cy.get('[data-cy-input="medico-agenda"]').should('exist');
        cy.get('[data-cy-input="horario-inicio"]').should('exist');
        cy.get('[data-cy-input="horario-fim"]').should('exist');
        cy.get('[data-cy-input="duracao-consulta"]').should('exist');
        cy.get('[data-cy-input="dia-segunda"]').should('exist');
        cy.get('[data-cy-input="dia-terca"]').should('exist');
        cy.get('[data-cy-input="dia-quarta"]').should('exist');
        cy.get('[data-cy-input="dia-quinta"]').should('exist');
        cy.get('[data-cy-input="dia-sexta"]').should('exist');
        cy.get('[data-cy-input="dia-sabado"]').should('exist');
        cy.get('[data-cy-button="salvar-configuracoes"]').should('exist');
    });

    it('deve exibir seção para bloquear horários', () => {
        cy.get('[data-cy-input="data-bloqueio"]').should('exist');
        cy.get('[data-cy-input="bloqueio-inicio"]').should('exist');
        cy.get('[data-cy-input="bloqueio-fim"]').should('exist');
        cy.get('[data-cy-input="motivo-bloqueio"]').should('exist');
        cy.get('[data-cy-button="bloquear-horario"]').should('exist');
    });

    it('deve exibir agenda semanal', () => {
        cy.get('table').should('exist');
        cy.get('thead th').should('have.length', 8);
        cy.contains('Horário');
        cy.contains('Seg 01');
        cy.contains('Ter 02');
        cy.contains('Qua 03');
        cy.contains('Qui 04');
        cy.contains('Sex 05');
        cy.contains('Sáb 06');
        cy.contains('Dom 07');
    });

    it('deve exibir consultas na agenda', () => {
        cy.contains('João Silva');
        cy.contains('Maria Santos');
        cy.contains('Pedro Costa');
        cy.contains('Ana Oliveira');
        cy.contains('Carlos Lima');
        cy.contains('Fernanda Rocha');
        cy.contains('Roberto Alves');
    });

    it('deve exibir status das consultas', () => {
        cy.get('.badge.bg-success').should('contain', 'Livre');
        cy.get('.badge.bg-warning').should('contain', 'Bloqueado');
        cy.get('.agenda-consulta.confirmada').should('exist');
        cy.get('.agenda-consulta.pendente').should('exist');
        cy.get('.agenda-consulta.realizada').should('exist');
        cy.get('.agenda-consulta.cancelada').should('exist');
    });

    it('deve exibir consultas do dia', () => {
        cy.contains('Consultas do Dia - Segunda, 01 Jan');
        cy.get('.list-group-item').should('have.length.at.least', 4);
        cy.contains('Livre');
        cy.contains('Bloqueado');
        cy.contains('Fernanda Rocha');
    });

    it('deve salvar configurações da agenda', () => {
        cy.get('[data-cy-input="horario-inicio"]').clear().type('07:00');
        cy.get('[data-cy-input="horario-fim"]').clear().type('19:00');
        cy.get('[data-cy-input="duracao-consulta"]').select('45');

        cy.intercept('PUT', '/api/agenda/configuracoes', {
            statusCode: 200,
            body: { success: true }
        }).as('salvarConfiguracoes');

        cy.get('[data-cy-button="salvar-configuracoes"]').click();
        cy.wait('@salvarConfiguracoes');

        cy.get('.alert-success').should('contain', 'Configurações salvas com sucesso');
    });

    it('deve bloquear horário', () => {
        cy.get('[data-cy-input="data-bloqueio"]').type('2024-12-29');
        cy.get('[data-cy-input="bloqueio-inicio"]').type('14:00');
        cy.get('[data-cy-input="bloqueio-fim"]').type('16:00');
        cy.get('[data-cy-input="motivo-bloqueio"]').type('Reunião administrativa');

        cy.intercept('POST', '/api/agenda/bloquear', {
            statusCode: 201,
            body: { success: true }
        }).as('bloquearHorario');

        cy.get('[data-cy-button="bloquear-horario"]').click();
        cy.wait('@bloquearHorario');

        cy.get('.alert-success').should('contain', 'Horário bloqueado com sucesso');
    });

    it('deve criar nova consulta', () => {
        cy.intercept('GET', '/api/consultas/nova', {
            statusCode: 200
        }).as('carregarNovaConsulta');

        cy.get('[data-cy-button="nova-consulta"]').click();
        cy.wait('@carregarNovaConsulta');

        cy.get('.modal').should('be.visible');
    });

    it('deve exportar agenda', () => {
        cy.intercept('GET', '/api/agenda/exportar', {
            statusCode: 200
        }).as('exportarAgenda');

        cy.get('[data-cy-button="exportar-agenda"]').click();
        cy.wait('@exportarAgenda');
    });

    it('deve editar consulta existente', () => {
        cy.intercept('GET', '/api/consultas/1/editar', {
            statusCode: 200,
            body: { consulta: {} }
        }).as('carregarEdicaoConsulta');

        cy.get('[data-cy-button="editar-consulta-1"]').first().click();
        cy.wait('@carregarEdicaoConsulta');

        cy.get('.modal').should('be.visible');
    });

    it('deve confirmar consulta pendente', () => {
        cy.intercept('PUT', '/api/consultas/2/confirmar', {
            statusCode: 200,
            body: { success: true }
        }).as('confirmarConsulta');

        cy.get('[data-cy-button="confirmar-consulta-1"]').first().click();
        cy.wait('@confirmarConsulta');

        cy.get('.alert-success').should('contain', 'Consulta confirmada');
    });

    it('deve agendar horário livre', () => {
        cy.intercept('GET', '/api/consultas/agendar?horario=08:00&data=2024-01-01', {
            statusCode: 200
        }).as('carregarAgendamento');

        cy.get('[data-cy-button="agendar-horario-1"]').first().click();
        cy.wait('@carregarAgendamento');

        cy.get('.modal').should('be.visible');
    });

    it('deve desbloquear horário', () => {
        cy.intercept('DELETE', '/api/agenda/bloqueios/1', {
            statusCode: 200,
            body: { success: true }
        }).as('desbloquearHorario');

        cy.get('[data-cy-button="desbloquear-horario-1"]').first().click();
        cy.wait('@desbloquearHorario');

        cy.get('.alert-success').should('contain', 'Horário desbloqueado');
    });

    it('deve iniciar consulta', () => {
        cy.intercept('POST', '/api/consultas/1/iniciar', {
            statusCode: 200,
            body: { success: true }
        }).as('iniciarConsulta');

        cy.get('[data-cy-button="iniciar-consulta-1"]').first().click();
        cy.wait('@iniciarConsulta');

        cy.url().should('include', '/consulta/');
    });

    it('deve reagendar consulta', () => {
        cy.intercept('GET', '/api/consultas/1/reagendar', {
            statusCode: 200
        }).as('carregarReagendamento');

        cy.get('[data-cy-button="reagendar-consulta-2"]').first().click();
        cy.wait('@carregarReagendamento');

        cy.get('.modal').should('be.visible');
    });

    it('deve cancelar consulta', () => {
        cy.intercept('DELETE', '/api/consultas/1/cancelar', {
            statusCode: 200,
            body: { success: true }
        }).as('cancelarConsulta');

        cy.get('[data-cy-button="cancelar-consulta-1"]').first().click();

        cy.get('.modal').should('be.visible');
        cy.contains('Confirmar cancelamento');
        cy.get('[data-cy-button="confirmar-cancelamento"]').click();

        cy.wait('@cancelarConsulta');
        cy.get('.alert-success').should('contain', 'Consulta cancelada');
    });

    it('deve carregar dados da agenda via API', () => {
        cy.intercept('GET', '/api/agenda/semanal', {
            statusCode: 200,
            body: {
                semana: [],
                consultas: []
            }
        }).as('carregarAgendaSemanal');

        cy.wait('@carregarAgendaSemanal');
    });

    it('deve carregar configurações da agenda via API', () => {
        cy.intercept('GET', '/api/agenda/configuracoes', {
            statusCode: 200,
            body: {
                horarioInicio: '08:00',
                horarioFim: '18:00',
                duracaoConsulta: '30'
            }
        }).as('carregarConfiguracoes');

        cy.wait('@carregarConfiguracoes');
    });

    it('deve manter layout responsivo', () => {
        cy.viewport('iphone-6');
        cy.get('table').should('be.visible');
        cy.get('.card').should('be.visible');

        cy.viewport('macbook-15');
        cy.get('.row').should('be.visible');
        cy.get('table').should('be.visible');
    });

    it('deve exibir diferentes médicos no seletor', () => {
        cy.get('[data-cy-input="medico-agenda"]').select('Dra. Ana Santos - Pediatria');
        cy.get('[data-cy-input="medico-agenda"]').select('Dr. Paulo Oliveira - Ortopedia');
    });

    it('deve alternar dias de trabalho', () => {
        cy.get('[data-cy-input="dia-sabado"]').check();
        cy.get('[data-cy-input="dia-sabado"]').should('be.checked');

        cy.get('[data-cy-input="dia-segunda"]').uncheck();
        cy.get('[data-cy-input="dia-segunda"]').should('not.be.checked');
    });
});