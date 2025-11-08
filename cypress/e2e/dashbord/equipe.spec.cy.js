describe('Dashboard da Equipe Médica', () => {
    beforeEach(() => {
        cy.visit('/profissional');
        cy.intercept('GET', '/api/staff/dados', {
            statusCode: 200,
            body: {
                nome: 'Dr. Carlos Mendonça',
                especialidade: 'Cardiologia',
                crm: 'CRM-SP 123456'
            }
        }).as('carregarDadosStaff');
    });

    it('deve carregar a página do dashboard da equipe com sucesso', () => {
        cy.url().should('include', '/dashboard-staff');
        cy.get('h1').should('contain', 'Dashboard Médico/Hospital');
        cy.contains('Bem-vindo, Dr. Carlos Mendonça');
    });

    it('deve exibir seção de pacientes do dia', () => {
        cy.get('[data-cy-label="pacientes-hoje"]').should('contain', 'Pacientes do Dia');
        cy.contains('João Pereira');
        cy.contains('09:00 - Cardiologia');
        cy.contains('Ana Costa');
        cy.contains('10:30 - Pediatria');
        cy.get('.badge.bg-success').should('contain', 'Confirmado');
        cy.get('.badge.bg-warning').should('contain', 'Aguardando');
    });

    it('deve exibir seção de consultas urgentes', () => {
        cy.get('[data-cy-label="consultas-urgentes"]').should('contain', 'Consultas Urgentes');
        cy.get('[data-cy-button="ver-urgencias"]').should('exist');
    });

    it('deve exibir funcionalidades administrativas para admin', () => {
        cy.get('[data-cy-label="administracao"]').should('contain', 'Administração (Apenas Admin)');
        cy.get('[data-cy-button="criar-relatorio"]').should('exist');
        cy.get('[data-cy-button="revisar-relatorio"]').should('exist');
        cy.get('[data-cy-button="enviar-relatorio"]').should('exist');
        cy.get('[data-cy-button="gerenciar-internacoes"]').should('exist');
        cy.get('[data-cy-button="aceitar-internacao"]').should('exist');
        cy.get('[data-cy-button="rejeitar-internacao"]').should('exist');
        cy.get('[data-cy-button="gerenciar-equipe"]').should('exist');
        cy.get('[data-cy-button="gerenciar-hospitais"]').should('exist');
    });

    it('deve exibir ações médicas para médicos', () => {
        cy.get('[data-cy-label="acoes-medicas"]').should('contain', 'Ações Médicas');
        cy.get('[data-cy-input="paciente-receita"]').should('exist');
        cy.get('[data-cy-input="medicamento"]').should('exist');
        cy.get('[data-cy-button="emitir-receita"]').should('exist');
        cy.get('[data-cy-button="avaliar-exame"]').should('exist');
        cy.get('[data-cy-button="avaliar-raio-x"]').should('exist');
    });

    it('deve emitir receita médica', () => {
        cy.get('[data-cy-input="paciente-receita"]').select('João Pereira');
        cy.get('[data-cy-input="medicamento"]').type('Aspirina 100mg');

        cy.intercept('POST', '/api/receitas/emitir', {
            statusCode: 201,
            body: { success: true, receitaId: 123 }
        }).as('emitirReceita');

        cy.get('[data-cy-button="emitir-receita"]').click();
        cy.wait('@emitirReceita');
        cy.get('.alert-success').should('contain', 'Receita emitida com sucesso');
    });

    it('deve avaliar exames médicos', () => {
        cy.intercept('GET', '/api/exames/1', {
            statusCode: 200,
            body: { exame: 'Hemograma Completo', paciente: 'João Pereira' }
        }).as('carregarExame');

        cy.get('[data-cy-button="avaliar-exame"]').first().click();
        cy.wait('@carregarExame');
        cy.url().should('include', '/avaliar-exame');
    });

    it('deve gerenciar relatórios como admin', () => {
        cy.get('[data-cy-button="criar-relatorio"]').click();
        cy.url().should('include', '/relatorios/criar');
    });

    it('deve gerenciar internações como admin', () => {
        cy.intercept('GET', '/api/internacoes/pendentes', {
            statusCode: 200,
            body: { internacoes: [] }
        }).as('carregarInternacoes');

        cy.get('[data-cy-button="gerenciar-internacoes"]').click();
        cy.wait('@carregarInternacoes');
        cy.url().should('include', '/internacoes');
    });

    it('deve exibir sessões remotas', () => {
        cy.get('[data-cy-label="sessoes-remotas"]').should('contain', 'Sessões Remotas');
        cy.get('[data-cy-input="paciente-sessao"]').should('exist');
        cy.get('[data-cy-button="iniciar-sessao"]').should('exist');
        cy.get('[data-cy-button="nova-sessao-remota"]').should('exist');
    });

    it('deve iniciar sessão remota existente', () => {
        cy.intercept('POST', '/api/sessoes-remotas/1/iniciar', {
            statusCode: 200,
            body: { success: true, sessionUrl: '/sessao/123' }
        }).as('iniciarSessaoExistente');

        cy.get('[data-cy-button="iniciar-sessao"]').click();
        cy.wait('@iniciarSessaoExistente');
        cy.url().should('include', '/sessao/123');
    });

    it('deve criar nova sessão remota', () => {
        cy.get('[data-cy-input="paciente-sessao"]').select('Ana Costa');

        cy.intercept('POST', '/api/sessoes-remotas/nova', {
            statusCode: 201,
            body: { success: true, sessionId: 456 }
        }).as('criarSessao');

        cy.get('[data-cy-button="nova-sessao-remota"]').click();
        cy.wait('@criarSessao');
    });

    it('deve ver central de urgências', () => {
        cy.intercept('GET', '/api/urgencias', {
            statusCode: 200,
            body: { urgencias: [] }
        }).as('carregarUrgencias');

        cy.get('[data-cy-button="ver-urgencias"]').click();
        cy.wait('@carregarUrgencias');
        cy.url().should('include', '/urgencias');
    });

    it('deve carregar dados do staff via API', () => {
        cy.wait('@carregarDadosStaff');
        cy.get('p.text-muted').should('contain', 'Dr. Carlos Mendonça');
    });

    it('deve exibir diferentes funcionalidades baseadas no nível de acesso', () => {
        cy.intercept('GET', '/api/staff/nivel-acesso', {
            statusCode: 200,
            body: { nivel: 'admin' }
        }).as('carregarNivelAcesso');

        cy.wait('@carregarNivelAcesso');
        cy.get('[data-cy-label="administracao"]').should('be.visible');
        cy.get('[data-cy-label="acoes-medicas"]').should('be.visible');
    });

    it('deve navegar para gerenciamento de equipe', () => {
        cy.intercept('GET', '/api/equipe', {
            statusCode: 200,
            body: { membros: [] }
        }).as('carregarEquipe');

        cy.get('[data-cy-button="gerenciar-equipe"]').click();
        cy.wait('@carregarEquipe');
        cy.url().should('include', '/equipe');
    });

    it('deve navegar para gerenciamento de hospitais', () => {
        cy.intercept('GET', '/api/hospitais', {
            statusCode: 200,
            body: { hospitais: [] }
        }).as('carregarHospitais');

        cy.get('[data-cy-button="gerenciar-hospitais"]').click();
        cy.wait('@carregarHospitais');
        cy.url().should('include', '/hospitais');
    });

    it('deve manter layout responsivo para staff', () => {
        cy.viewport('iphone-6');
        cy.get('[data-cy-label="pacientes-hoje"]').should('be.visible');
        cy.get('[data-cy-label="administracao"]').should('be.visible');

        cy.viewport('macbook-15');
        cy.get('[data-cy-label="acoes-medicas"]').should('be.visible');
        cy.get('[data-cy-label="sessoes-remotas"]').should('be.visible');
    });
});