describe('Página de Marcação de Consulta', () => {
    beforeEach(() => {
        cy.visit('/agenda/nova-consulta');
    });

    it('deve carregar a página de marcação com sucesso', () => {
        cy.url().should('include', '/agenda/nova-consulta');
        cy.get('h1').should('contain', 'Marcar Consulta');
        cy.get('.breadcrumb').should('exist');
    });

    it('deve exibir formulário de seleção de especialidade', () => {
        cy.get('[data-cy-input="especialidade-consulta"]').should('exist');
        cy.get('[data-cy-input="hospital-consulta"]').should('exist');
        cy.get('[data-cy-input="tipo-consulta"]').should('exist');
        cy.get('[data-cy-input="medico-preferencia"]').should('exist');
    });

    it('deve exibir calendário com datas disponíveis', () => {
        cy.contains('Dezembro 2024');
        cy.get('.text-center .col').should('have.length', 7);
        cy.contains('Seg');
        cy.contains('Ter');
        cy.contains('Qua');
        cy.contains('Qui');
        cy.contains('Sex');
        cy.contains('Sáb');
        cy.contains('Dom');
    });

    it('deve exibir horários disponíveis', () => {
        cy.get('[data-cy-button="horario-08:00"]').should('exist');
        cy.get('[data-cy-button="horario-08:30"]').should('exist');
        cy.get('[data-cy-button="horario-09:00"]').should('exist');
        cy.get('[data-cy-button="horario-10:00"]').should('exist');
        cy.get('[data-cy-button="horario-10:30"]').should('exist');
        cy.get('[data-cy-button="horario-14:00"]').should('exist');
        cy.get('[data-cy-button="horario-14:30"]').should('exist');
        cy.get('[data-cy-button="horario-15:00"]').should('exist');
        cy.get('[data-cy-button="horario-16:00"]').should('exist');
    });

    it('deve exibir resumo da consulta', () => {
        cy.get('[data-cy-info="especialidade-selecionada"]').should('exist');
        cy.get('[data-cy-info="medico-selecionado"]').should('exist');
        cy.get('[data-cy-info="local-selecionado"]').should('exist');
        cy.get('[data-cy-info="data-selecionada"]').should('exist');
        cy.get('[data-cy-info="horario-selecionado"]').should('exist');
        cy.get('[data-cy-info="tipo-selecionado"]').should('exist');
    });

    it('deve exibir checkbox de termos e condições', () => {
        cy.get('[data-cy-input="termos-aceitos"]').should('exist');
    });

    it('deve exibir botões de ação', () => {
        cy.get('[data-cy-button="confirmar-agendamento"]').should('exist');
        cy.get('[data-cy-button="cancelar-agendamento"]').should('exist');
    });

    it('deve selecionar especialidade e hospital', () => {
        cy.get('[data-cy-input="especialidade-consulta"]').select('Cardiologia');
        cy.get('[data-cy-input="hospital-consulta"]').select('Hospital São Lucas');

        cy.intercept('GET', '/api/medicos?especialidade=cardiologia&hospital=sao-lucas', {
            statusCode: 200,
            body: { medicos: ['Dr. Carlos Silva'] }
        }).as('carregarMedicos');

        cy.wait('@carregarMedicos');
    });

    it('deve selecionar tipo de consulta', () => {
        cy.get('[data-cy-input="tipo-consulta"]').select('Primeira Vez');
    });

    it('deve selecionar médico de preferência', () => {
        cy.get('[data-cy-input="medico-preferencia"]').select('Dr. Carlos Silva');
    });

    it('deve selecionar horário disponível', () => {
        cy.get('[data-cy-button="horario-08:00"]').click();
        cy.get('[data-cy-info="horario-selecionado"]').should('contain', '08:00');
    });

    it('deve navegar entre semanas', () => {
        cy.intercept('GET', '/api/horarios?week=previous', {
            statusCode: 200,
            body: { horarios: [] }
        }).as('semanaAnterior');

        cy.get('[data-cy-button="semana-anterior"]').click();
        cy.wait('@semanaAnterior');

        cy.intercept('GET', '/api/horarios?week=next', {
            statusCode: 200,
            body: { horarios: [] }
        }).as('proximaSemana');

        cy.get('[data-cy-button="proxima-semana"]').click();
        cy.wait('@proximaSemana');
    });

    it('deve aceitar termos e condições', () => {
        cy.get('[data-cy-input="termos-aceitos"]').check();
        cy.get('[data-cy-input="termos-aceitos"]').should('be.checked');
    });

    it('deve confirmar agendamento com sucesso', () => {
        cy.get('[data-cy-input="especialidade-consulta"]').select('Cardiologia');
        cy.get('[data-cy-input="hospital-consulta"]').select('Hospital São Lucas');
        cy.get('[data-cy-input="tipo-consulta"]').select('Primeira Vez');
        cy.get('[data-cy-button="horario-08:00"]').click();
        cy.get('[data-cy-input="termos-aceitos"]').check();

        cy.intercept('POST', '/api/consultas/agendar', {
            statusCode: 201,
            body: {
                success: true,
                consultaId: 123,
                mensagem: 'Consulta agendada com sucesso'
            }
        }).as('agendarConsulta');

        cy.get('[data-cy-button="confirmar-agendamento"]').click();
        cy.wait('@agendarConsulta');

        cy.get('.alert-success').should('contain', 'Consulta agendada com sucesso');
    });

    it('deve validar campos obrigatórios antes do agendamento', () => {
        cy.get('[data-cy-button="confirmar-agendamento"]').click();

        cy.get('.alert-danger').should('contain', 'Preencha todos os campos obrigatórios');
        cy.get('[data-cy-input="termos-aceitos"]').should('have.class', 'is-invalid');
    });

    it('deve cancelar agendamento', () => {
        cy.get('[data-cy-button="cancelar-agendamento"]').click();
        cy.url().should('include', '/agenda');
    });

    it('deve atualizar resumo quando selecionar opções', () => {
        cy.get('[data-cy-input="especialidade-consulta"]').select('Cardiologia');
        cy.get('[data-cy-info="especialidade-selecionada"]').should('contain', 'Cardiologia');

        cy.get('[data-cy-input="hospital-consulta"]').select('Hospital São Lucas');
        cy.get('[data-cy-info="local-selecionado"]').should('contain', 'Hospital São Lucas');

        cy.get('[data-cy-input="tipo-consulta"]').select('Primeira Vez');
        cy.get('[data-cy-info="tipo-selecionado"]').should('contain', 'Primeira Vez');

        cy.get('[data-cy-button="horario-08:00"]').click();
        cy.get('[data-cy-info="horario-selecionado"]').should('contain', '08:00');
    });

    it('deve carregar horários disponíveis via API', () => {
        cy.intercept('GET', '/api/horarios/disponiveis*', {
            statusCode: 200,
            body: {
                horarios: ['08:00', '08:30', '09:00', '10:00']
            }
        }).as('carregarHorarios');

        cy.get('[data-cy-input="especialidade-consulta"]').select('Cardiologia');
        cy.get('[data-cy-input="hospital-consulta"]').select('Hospital São Lucas');
        cy.get('[data-cy-input="medico-preferencia"]').select('Dr. Carlos Silva');

        cy.wait('@carregarHorarios');
    });

    it('deve exibir mensagem de erro em falha no agendamento', () => {
        cy.get('[data-cy-input="especialidade-consulta"]').select('Cardiologia');
        cy.get('[data-cy-input="hospital-consulta"]').select('Hospital São Lucas');
        cy.get('[data-cy-button="horario-08:00"]').click();
        cy.get('[data-cy-input="termos-aceitos"]').check();

        cy.intercept('POST', '/api/consultas/agendar', {
            statusCode: 400,
            body: {
                error: 'Horário não disponível'
            }
        }).as('agendarConsultaErro');

        cy.get('[data-cy-button="confirmar-agendamento"]').click();
        cy.wait('@agendarConsultaErro');

        cy.get('.alert-danger').should('contain', 'Horário não disponível');
    });

    it('deve manter layout responsivo', () => {
        cy.viewport('iphone-6');
        cy.get('[data-cy-input="especialidade-consulta"]').should('be.visible');
        cy.get('.horarios-disponiveis').should('be.visible');

        cy.viewport('macbook-15');
        cy.get('.row').should('be.visible');
        cy.get('.card').should('be.visible');
    });

    it('deve carregar médicos baseados na especialidade selecionada', () => {
        cy.intercept('GET', '/api/medicos?especialidade=pediatria', {
            statusCode: 200,
            body: {
                medicos: [
                    { id: 1, nome: 'Dra. Ana Santos' },
                    { id: 2, nome: 'Dr. Paulo Costa' }
                ]
            }
        }).as('carregarMedicosPediatria');

        cy.get('[data-cy-input="especialidade-consulta"]').select('Pediatria');
        cy.wait('@carregarMedicosPediatria');

        cy.get('[data-cy-input="medico-preferencia"]').should('contain', 'Dra. Ana Santos');
    });
});