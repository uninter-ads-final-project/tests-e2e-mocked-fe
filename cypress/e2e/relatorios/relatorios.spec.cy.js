describe('Página de Relatórios', () => {
    beforeEach(() => {
        cy.visit('/relatorios');
    });

    it('deve carregar a página de relatórios com sucesso', () => {
        cy.url().should('include', '/relatorios');
        cy.get('h1').should('contain', 'Relatórios e Analytics');
        cy.get('.breadcrumb').should('exist');
    });

    it('deve exibir formulário de configuração de relatório', () => {
        cy.get('[data-cy-input="tipo-relatorio"]').should('exist');
        cy.get('[data-cy-input="data-inicio"]').should('exist');
        cy.get('[data-cy-input="data-fim"]').should('exist');
        cy.get('[data-cy-input="hospitais"]').should('exist');
        cy.get('[data-cy-input="medicos"]').should('exist');
        cy.get('[data-cy-input="especialidades"]').should('exist');
        cy.get('[data-cy-input="staff"]').should('exist');
    });

    it('deve exibir campos do relatório', () => {
        cy.get('[data-cy-input="campo-dados-pessoais"]').should('exist');
        cy.get('[data-cy-input="campo-contato"]').should('exist');
        cy.get('[data-cy-input="campo-historico"]').should('exist');
        cy.get('[data-cy-input="campo-consultas"]').should('exist');
        cy.get('[data-cy-input="campo-financeiro"]').should('exist');
        cy.get('[data-cy-input="campo-medicamentos"]').should('exist');
        cy.get('[data-cy-input="campo-exames"]').should('exist');
    });

    it('deve exibir formatos de saída', () => {
        cy.get('[data-cy-input="formato-pdf"]').should('exist');
        cy.get('[data-cy-input="formato-csv"]').should('exist');
        cy.get('[data-cy-input="formato-excel"]').should('exist');
    });

    it('deve exibir botões de ação', () => {
        cy.get('[data-cy-button="gerar-relatorio"]').should('exist');
        cy.get('[data-cy-button="salvar-configuracao"]').should('exist');
        cy.get('[data-cy-button="exportar-relatorio"]').should('exist');
        cy.get('[data-cy-button="compartilhar-relatorio"]').should('exist');
    });

    it('deve exibir pré-visualização do relatório', () => {
        cy.contains('Pré-visualização do Relatório');
        cy.contains('Resumo Estatístico');
        cy.get('table').should('exist');
    });

    it('deve exibir estatísticas', () => {
        cy.contains('1,247');
        cy.contains('Consultas Realizadas');
        cy.contains('342');
        cy.contains('Novos Pacientes');
        cy.contains('R$ 284.567');
        cy.contains('Faturamento Total');
        cy.contains('87%');
        cy.contains('Taxa de Ocupação');
    });

    it('deve exibir tabela de consultas', () => {
        cy.get('thead th').should('have.length', 7);
        cy.contains('Data');
        cy.contains('Paciente');
        cy.contains('Médico');
        cy.contains('Especialidade');
        cy.contains('Hospital');
        cy.contains('Status');
        cy.contains('Valor');
    });

    it('deve exibir consultas por especialidade', () => {
        cy.contains('Consultas por Especialidade');
        cy.contains('Cardiologia');
        cy.contains('284');
        cy.contains('Pediatria');
        cy.contains('196');
        cy.contains('Ortopedia');
        cy.contains('173');
        cy.contains('Dermatologia');
        cy.contains('158');
    });

    it('deve exibir desempenho por hospital', () => {
        cy.contains('Desempenho por Hospital');
        cy.contains('São Lucas');
        cy.contains('92%');
        cy.contains('Santa Casa');
        cy.contains('88%');
        cy.contains('Albert Einstein');
        cy.contains('76%');
        cy.contains('Sírio-Libanês');
        cy.contains('85%');
    });

    it('deve exibir relatórios salvos', () => {
        cy.contains('Relatórios Salvos');
        cy.get('table tbody tr').should('have.length.at.least', 3);
        cy.contains('Relatório Mensal - Dezembro');
        cy.contains('Análise Financeira Trimestral');
        cy.contains('Performance Médica');
    });

    it('deve gerar relatório com configurações', () => {
        cy.get('[data-cy-input="tipo-relatorio"]').select('Consultas e Agendamentos');
        cy.get('[data-cy-input="data-inicio"]').type('2024-12-01');
        cy.get('[data-cy-input="data-fim"]').type('2024-12-31');
        cy.get('[data-cy-input="hospitais"]').select(['sao-lucas', 'santa-casa']);
        cy.get('[data-cy-input="formato-pdf"]').check();

        cy.intercept('POST', '/api/relatorios/gerar', {
            statusCode: 200,
            body: { success: true, relatorioId: 123 }
        }).as('gerarRelatorio');

        cy.get('[data-cy-button="gerar-relatorio"]').click();
        cy.wait('@gerarRelatorio');

        cy.get('.alert-success').should('contain', 'Relatório gerado com sucesso');
    });

    it('deve salvar configuração de relatório', () => {
        cy.get('[data-cy-input="tipo-relatorio"]').select('Pacientes Cadastrados');
        cy.get('[data-cy-input="data-inicio"]').type('2024-12-01');

        cy.intercept('POST', '/api/relatorios/configuracoes/salvar', {
            statusCode: 200,
            body: { success: true }
        }).as('salvarConfiguracao');

        cy.get('[data-cy-button="salvar-configuracao"]').click();
        cy.wait('@salvarConfiguracao');

        cy.get('.alert-success').should('contain', 'Configuração salva');
    });

    it('deve exportar relatório', () => {
        cy.intercept('GET', '/api/relatorios/123/exportar', {
            statusCode: 200
        }).as('exportarRelatorio');

        cy.get('[data-cy-button="exportar-relatorio"]').click();
        cy.wait('@exportarRelatorio');
    });

    it('deve compartilhar relatório', () => {
        cy.intercept('POST', '/api/relatorios/123/compartilhar', {
            statusCode: 200,
            body: { success: true }
        }).as('compartilharRelatorio');

        cy.get('[data-cy-button="compartilhar-relatorio"]').click();
        cy.wait('@compartilharRelatorio');

        cy.get('.alert-success').should('contain', 'Relatório compartilhado');
    });

    it('deve usar relatório salvo', () => {
        cy.intercept('GET', '/api/relatorios/salvos/1', {
            statusCode: 200,
            body: { configuracoes: {} }
        }).as('carregarRelatorioSalvo');

        cy.get('[data-cy-button="usar-relatorio-1"]').first().click();
        cy.wait('@carregarRelatorioSalvo');

        cy.get('[data-cy-input="tipo-relatorio"]').should('have.value', 'consultas');
    });

    it('deve baixar relatório salvo', () => {
        cy.intercept('GET', '/api/relatorios/salvos/1/baixar', {
            statusCode: 200
        }).as('baixarRelatorio');

        cy.get('[data-cy-button="baixar-relatorio-1"]').first().click();
        cy.wait('@baixarRelatorio');
    });

    it('deve excluir relatório salvo', () => {
        cy.intercept('DELETE', '/api/relatorios/salvos/1', {
            statusCode: 200,
            body: { success: true }
        }).as('excluirRelatorio');

        cy.get('[data-cy-button="excluir-relatorio-1"]').first().click();

        cy.get('.modal').should('be.visible');
        cy.contains('Confirmar exclusão');
        cy.get('[data-cy-button="confirmar-exclusao"]').click();

        cy.wait('@excluirRelatorio');
        cy.get('.alert-success').should('contain', 'Relatório excluído');
    });

    it('deve selecionar múltiplos hospitais', () => {
        cy.get('[data-cy-input="hospitais"]').select(['sao-lucas', 'santa-casa']);
        cy.get('[data-cy-input="hospitais"]').invoke('val').should('deep.equal', ['sao-lucas', 'santa-casa']);
    });

    it('deve selecionar múltiplos médicos', () => {
        cy.get('[data-cy-input="medicos"]').select(['carlos-silva', 'ana-santos']);
        cy.get('[data-cy-input="medicos"]').invoke('val').should('deep.equal', ['carlos-silva', 'ana-santos']);
    });

    it('deve selecionar múltiplas especialidades', () => {
        cy.get('[data-cy-input="especialidades"]').select(['cardiologia', 'pediatria']);
        cy.get('[data-cy-input="especialidades"]').invoke('val').should('deep.equal', ['cardiologia', 'pediatria']);
    });

    it('deve selecionar campos do relatório', () => {
        cy.get('[data-cy-input="campo-historico"]').check();
        cy.get('[data-cy-input="campo-financeiro"]').check();
        cy.get('[data-cy-input="campo-historico"]').should('be.checked');
        cy.get('[data-cy-input="campo-financeiro"]').should('be.checked');
    });

    it('deve selecionar formato CSV', () => {
        cy.get('[data-cy-input="formato-csv"]').check();
        cy.get('[data-cy-input="formato-csv"]').should('be.checked');
    });

    it('deve selecionar formato Excel', () => {
        cy.get('[data-cy-input="formato-excel"]').check();
        cy.get('[data-cy-input="formato-excel"]').should('be.checked');
    });

    it('deve carregar dados de relatório via API', () => {
        cy.intercept('GET', '/api/relatorios/dados', {
            statusCode: 200,
            body: {
                consultasRealizadas: 1247,
                novosPacientes: 342,
                faturamentoTotal: 284567,
                taxaOcupacao: 87
            }
        }).as('carregarDadosRelatorio');

        cy.wait('@carregarDadosRelatorio');
    });

    it('deve carregar relatórios salvos via API', () => {
        cy.intercept('GET', '/api/relatorios/salvos', {
            statusCode: 200,
            body: {
                relatorios: []
            }
        }).as('carregarRelatoriosSalvos');

        cy.wait('@carregarRelatoriosSalvos');
    });

    it('deve manter layout responsivo', () => {
        cy.viewport('iphone-6');
        cy.get('.card').should('be.visible');
        cy.get('table').should('be.visible');

        cy.viewport('macbook-15');
        cy.get('.row').should('be.visible');
        cy.get('.col-md-4').should('be.visible');
        cy.get('.col-md-8').should('be.visible');
    });

    it('deve exibir mensagem de erro em falha na geração', () => {
        cy.get('[data-cy-input="tipo-relatorio"]').select('Consultas e Agendamentos');

        cy.intercept('POST', '/api/relatorios/gerar', {
            statusCode: 500,
            body: { error: 'Erro interno do servidor' }
        }).as('gerarRelatorioErro');

        cy.get('[data-cy-button="gerar-relatorio"]').click();
        cy.wait('@gerarRelatorioErro');

        cy.get('.alert-danger').should('contain', 'Erro interno do servidor');
    });
});