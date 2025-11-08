describe('Dashboard do Paciente', () => {
    beforeEach(() => {
        cy.visit('/paciente');
    });

    it('deve carregar a página do dashboard com sucesso', () => {
        cy.url().should('include', '/dashboard');
        cy.get('h1').should('contain', 'Dashboard do Paciente');
    });

    it('deve exibir informações básicas do paciente', () => {
        cy.get('[data-cy-label="informacoes-basicas"]').should('contain', 'Informações Básicas');
        cy.get('[data-cy-info="nome"]').should('contain', 'Maria Silva Santos');
        cy.get('[data-cy-info="contato-principal"]').should('contain', '(11) 99999-9999');
        cy.get('[data-cy-info="contato-secundario"]').should('contain', '(11) 88888-8888');
        cy.get('[data-cy-button="editar-informacoes"]').should('exist');
    });

    it('deve exibir seção de próximas consultas', () => {
        cy.get('[data-cy-label="proximas-consultas"]').should('contain', 'Próximas Consultas');
        cy.get('[data-cy-button="agendar-consulta"]').should('exist');
    });

    it('deve exibir histórico de últimas sessões', () => {
        cy.get('[data-cy-label="ultimas-sessoes"]').should('contain', 'Últimas Sessões');
        cy.get('[data-cy-button="resumo-consulta"]').should('exist');
        cy.get('[data-cy-button="resultados-consulta"]').should('exist');
        cy.get('[data-cy-button="resumo-avaliacao"]').should('exist');
        cy.get('[data-cy-button="resultados-avaliacao"]').should('exist');
    });

    it('deve exibir documentos e receitas', () => {
        cy.get('[data-cy-label="documentos"]').should('contain', 'Documentos e Receitas');
        cy.get('[data-cy-button="visualizar-receita"]').should('exist');
        cy.get('[data-cy-button="download-receita"]').should('exist');
        cy.get('[data-cy-button="visualizar-exames"]').should('exist');
        cy.get('[data-cy-button="download-exames"]').should('exist');
    });

    it('deve exibir botão para sessão remota', () => {
        cy.get('[data-cy-label="sessao-remota"]').should('contain', 'Sessão Remota com Médico');
        cy.get('[data-cy-button="entrar-sessao-remota"]').should('exist').and('contain', 'Entrar na Sessão Remota');
    });

    it('deve navegar para agendamento de consulta', () => {
        cy.get('[data-cy-button="agendar-consulta"]').click();
        cy.url().should('include', '/agendar-consulta');
    });

    it('deve abrir resumo de consulta', () => {
        cy.intercept('GET', '/api/consultas/*/resumo', {
            statusCode: 200,
            body: { success: true }
        }).as('carregarResumo');

        cy.get('[data-cy-button="resumo-consulta"]').first().click();
        cy.wait('@carregarResumo');
        cy.get('.modal').should('be.visible');
    });

    it('deve baixar receita médica', () => {
        cy.intercept('GET', '/api/documentos/receita/*', {
            statusCode: 200
        }).as('baixarReceita');

        cy.get('[data-cy-button="download-receita"]').first().click();
        cy.wait('@baixarReceita');
    });

    it('deve iniciar sessão remota', () => {
        cy.intercept('POST', '/api/sessoes-remotas/iniciar', {
            statusCode: 200,
            body: { success: true, sessionUrl: '/sessao-remota/123' }
        }).as('iniciarSessao');

        cy.get('[data-cy-button="entrar-sessao-remota"]').click();
        cy.wait('@iniciarSessao');
        cy.url().should('include', '/sessao-remota');
    });

    it('deve editar informações do paciente', () => {
        cy.intercept('GET', '/api/pacientes/editar', {
            statusCode: 200
        }).as('carregarEdicao');

        cy.get('[data-cy-button="editar-informacoes"]').click();
        cy.wait('@carregarEdicao');
        cy.url().should('include', '/editar-perfil');
    });

    it('deve exibir lista de consultas com datas e médicos', () => {
        cy.contains('Consulta de Rotina');
        cy.contains('Dr. Silva');
        cy.contains('15/12/2024');
        cy.contains('Avaliação Inicial');
        cy.contains('Dr. Santos');
        cy.contains('10/12/2024');
    });

    it('deve exibir lista de documentos com datas', () => {
        cy.contains('Receita Médica');
        cy.contains('15/12/2024');
        cy.contains('Exames Laboratoriais');
        cy.contains('12/12/2024');
    });

    it('deve manter layout responsivo', () => {
        cy.viewport('iphone-6');
        cy.get('[data-cy-label="informacoes-basicas"]').should('be.visible');
        cy.get('[data-cy-label="proximas-consultas"]').should('be.visible');

        cy.viewport('macbook-15');
        cy.get('[data-cy-label="informacoes-basicas"]').should('be.visible');
        cy.get('[data-cy-label="proximas-consultas"]').should('be.visible');
    });

    it('deve carregar dados do paciente via API', () => {
        cy.intercept('GET', '/api/pacientes/dados', {
            statusCode: 200,
            body: {
                nome: 'Maria Silva Santos',
                contato_principal: '(11) 99999-9999',
                contato_secundario: '(11) 88888-8888'
            }
        }).as('carregarDadosPaciente');

        cy.wait('@carregarDadosPaciente');
        cy.get('[data-cy-info="nome"]').should('contain', 'Maria Silva Santos');
    });
});