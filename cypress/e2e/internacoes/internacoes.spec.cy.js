describe('Página de Internações', () => {
    beforeEach(() => {
        cy.visit('/internacoes');
    });

    it('deve carregar a página de internações com sucesso', () => {
        cy.url().should('include', '/internacoes');
        cy.get('h1').should('contain', 'Gerenciar Internações');
        cy.get('.breadcrumb').should('exist');
    });

    it('deve exibir filtros de internação', () => {
        cy.get('[data-cy-input="filtro-status"]').should('exist');
        cy.get('[data-cy-input="filtro-hospital"]').should('exist');
        cy.get('[data-cy-input="filtro-especialidade"]').should('exist');
        cy.get('[data-cy-input="data-entrada-inicio"]').should('exist');
        cy.get('[data-cy-input="data-entrada-fim"]').should('exist');
        cy.get('[data-cy-button="aplicar-filtros"]').should('exist');
    });

    it('deve exibir ações rápidas', () => {
        cy.get('[data-cy-button="nova-internacao"]').should('exist');
        cy.get('[data-cy-button="registrar-indisponibilidade"]').should('exist');
        cy.get('[data-cy-button="relatorio-internacoes"]').should('exist');
    });

    it('deve exibir solicitações de internação pendentes', () => {
        cy.contains('Solicitações de Internação Pendentes');
        cy.get('.list-group-item').should('have.length.at.least', 2);
        cy.contains('João Silva');
        cy.contains('Maria Santos');
        cy.contains('CPF: 123.456.789-00');
        cy.contains('CPF: 987.654.321-00');
    });

    it('deve exibir internações ativas', () => {
        cy.contains('Internações Ativas');
        cy.get('table tbody tr').should('have.length.at.least', 2);
        cy.contains('Pedro Oliveira');
        cy.contains('Ana Costa');
        cy.contains('Quarto 201A');
        cy.contains('Quarto 105B');
    });

    it('deve exibir indisponibilidades de leitos', () => {
        cy.contains('Indisponibilidades de Leitos');
        cy.get('.list-group-item').should('have.length.at.least', 2);
        cy.contains('Quarto 108A');
        cy.contains('Quarto 205B');
        cy.contains('Limpeza e Desinfecção');
        cy.contains('Manutenção Elétrica');
    });

    it('deve exibir estatísticas', () => {
        cy.contains('Estatísticas');
        cy.contains('45');
        cy.contains('Leitos Ocupados');
        cy.contains('12');
        cy.contains('Leitos Disponíveis');
        cy.contains('4.2');
        cy.contains('Dias Média');
        cy.contains('3');
        cy.contains('Altas Hoje');
        cy.contains('5');
        cy.contains('Entradas Hoje');
    });

    it('deve aplicar filtros de internação', () => {
        cy.get('[data-cy-input="filtro-status"]').select('solicitada');
        cy.get('[data-cy-input="filtro-hospital"]').select('sao-lucas');
        cy.get('[data-cy-input="filtro-especialidade"]').select('cardiologia');

        cy.intercept('GET', '/api/internacoes/filtrar*', {
            statusCode: 200,
            body: { internacoes: [] }
        }).as('aplicarFiltros');

        cy.get('[data-cy-button="aplicar-filtros"]').click();
        cy.wait('@aplicarFiltros');
    });

    it('deve aprovar solicitação de internação', () => {
        cy.intercept('PUT', '/api/internacoes/1/aprovar', {
            statusCode: 200,
            body: { success: true }
        }).as('aprovarInternacao');

        cy.get('[data-cy-button="aprovar-0"]').click();
        cy.wait('@aprovarInternacao');

        cy.get('.alert-success').should('contain', 'Internação aprovada com sucesso');
    });

    it('deve abrir modal para negar internação', () => {
        cy.get('[data-cy-button="negar-0"]').click();
        cy.get('.modal').should('be.visible');
        cy.contains('Negar Solicitação de Internação');
    });

    it('deve negar internação com motivo', () => {
        cy.get('[data-cy-button="negar-0"]').click();

        cy.get('[data-cy-input="motivo-negacao"]').select('sem-vaga');
        cy.get('[data-cy-input="observacoes-negacao"]').type('Não há leitos disponíveis na UTI');

        cy.intercept('PUT', '/api/internacoes/1/negar', {
            statusCode: 200,
            body: { success: true }
        }).as('negarInternacao');

        cy.get('[data-cy-button="confirmar-negacao"]').click();
        cy.wait('@negarInternacao');

        cy.get('.alert-success').should('contain', 'Internação negada com sucesso');
    });

    it('deve cancelar negação de internação', () => {
        cy.get('[data-cy-button="negar-0"]').click();
        cy.get('[data-cy-button="cancelar-negacao"]').click();
        cy.get('.modal').should('not.be.visible');
    });

    it('deve abrir modal para dar alta', () => {
        cy.get('[data-cy-button="alta-0"]').first().click();
        cy.get('.modal').should('be.visible');
        cy.contains('Registrar Alta Médica');
    });

    it('deve registrar alta médica', () => {
        cy.get('[data-cy-button="alta-0"]').first().click();

        cy.get('[data-cy-input="tipo-alta"]').select('alta-medica');
        cy.get('[data-cy-input="data-alta"]').type('2024-12-28');
        cy.get('[data-cy-input="hora-alta"]').type('14:30');
        cy.get('[data-cy-input="relatorio-alta"]').type('Paciente em boas condições, orientado retorno em 30 dias');

        cy.intercept('PUT', '/api/internacoes/3/alta', {
            statusCode: 200,
            body: { success: true }
        }).as('registrarAlta');

        cy.get('[data-cy-button="confirmar-alta"]').click();
        cy.wait('@registrarAlta');

        cy.get('.alert-success').should('contain', 'Alta registrada com sucesso');
    });

    it('deve cancelar registro de alta', () => {
        cy.get('[data-cy-button="alta-0"]').first().click();
        cy.get('[data-cy-button="cancelar-alta"]').click();
        cy.get('.modal').should('not.be.visible');
    });

    it('deve transferir paciente', () => {
        cy.intercept('GET', '/api/internacoes/3/transferir', {
            statusCode: 200
        }).as('carregarTransferencia');

        cy.get('[data-cy-button="transferir-0"]').first().click();
        cy.wait('@carregarTransferencia');

        cy.get('.modal').should('be.visible');
    });

    it('deve acessar prontuário do paciente', () => {
        cy.intercept('GET', '/api/internacoes/3/prontuario', {
            statusCode: 200
        }).as('carregarProntuario');

        cy.get('[data-cy-button="prontuario-0"]').first().click();
        cy.wait('@carregarProntuario');

        cy.url().should('include', '/prontuario');
    });

    it('deve liberar leito indisponível', () => {
        cy.intercept('PUT', '/api/leitos/108A/liberar', {
            statusCode: 200,
            body: { success: true }
        }).as('liberarLeito');

        cy.get('[data-cy-button="liberar-leito-0"]').first().click();
        cy.wait('@liberarLeito');

        cy.get('.alert-success').should('contain', 'Leito liberado com sucesso');
    });

    it('deve criar nova internação', () => {
        cy.intercept('GET', '/api/internacoes/nova', {
            statusCode: 200
        }).as('carregarNovaInternacao');

        cy.get('[data-cy-button="nova-internacao"]').click();
        cy.wait('@carregarNovaInternacao');

        cy.url().should('include', '/internacoes/nova');
    });

    it('deve registrar indisponibilidade', () => {
        cy.intercept('GET', '/api/leitos/indisponibilidade', {
            statusCode: 200
        }).as('carregarIndisponibilidade');

        cy.get('[data-cy-button="registrar-indisponibilidade"]').click();
        cy.wait('@carregarIndisponibilidade');

        cy.get('.modal').should('be.visible');
    });

    it('deve gerar relatório de internações', () => {
        cy.intercept('GET', '/api/internacoes/relatorio', {
            statusCode: 200
        }).as('gerarRelatorio');

        cy.get('[data-cy-button="relatorio-internacoes"]').click();
        cy.wait('@gerarRelatorio');
    });

    it('deve ver detalhes da solicitação', () => {
        cy.intercept('GET', '/api/internacoes/1/detalhes', {
            statusCode: 200
        }).as('carregarDetalhes');

        cy.get('[data-cy-button="detalhes-0"]').first().click();
        cy.wait('@carregarDetalhes');

        cy.get('.modal').should('be.visible');
    });

    it('deve exibir status das internações', () => {
        cy.get('.badge.bg-success').should('contain', 'Estável');
        cy.get('.badge.bg-warning').should('contain', 'Acompanhamento');
    });

    it('deve carregar dados de internações via API', () => {
        cy.intercept('GET', '/api/internacoes/pendentes', {
            statusCode: 200,
            body: { internacoes: [] }
        }).as('carregarPendentes');

        cy.intercept('GET', '/api/internacoes/ativas', {
            statusCode: 200,
            body: { internacoes: [] }
        }).as('carregarAtivas');

        cy.wait('@carregarPendentes');
        cy.wait('@carregarAtivas');
    });

    it('deve carregar estatísticas via API', () => {
        cy.intercept('GET', '/api/internacoes/estatisticas', {
            statusCode: 200,
            body: {
                leitosOcupados: 45,
                leitosDisponiveis: 12,
                mediaPermanencia: 4.2,
                altasHoje: 3,
                entradasHoje: 5
            }
        }).as('carregarEstatisticas');

        cy.wait('@carregarEstatisticas');
    });

    it('deve carregar indisponibilidades via API', () => {
        cy.intercept('GET', '/api/leitos/indisponiveis', {
            statusCode: 200,
            body: { indisponibilidades: [] }
        }).as('carregarIndisponibilidades');

        cy.wait('@carregarIndisponibilidades');
    });

    it('deve manter layout responsivo', () => {
        cy.viewport('iphone-6');
        cy.get('.card').should('be.visible');
        cy.get('table').should('be.visible');

        cy.viewport('macbook-15');
        cy.get('.row').should('be.visible');
        cy.get('.col-md-3').should('be.visible');
        cy.get('.col-md-9').should('be.visible');
    });

    it('deve exibir informações completas do paciente', () => {
        cy.contains('67 anos');
        cy.contains('Unimed');
        cy.contains('45 anos');
        cy.contains('Amil');
        cy.contains('26/12/2024');
        cy.contains('27/12/2024');
        cy.contains('30/12/2024');
        cy.contains('02/01/2025');
    });
});