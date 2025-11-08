describe('Criação de Conta do Paciente', () => {
    beforeEach(() => {
        cy.visit('/nova-conta');
        cy.wait(1000)
    });

    it('deve carregar a página de cadastro com sucesso', () => {
        cy.url().should('include', '/nova-conta');
        cy.get('h2').should('contain', 'Registrar nova conta');
    });

    it('deve conter todos os elementos obrigatórios do formulário', () => {
        cy.get('[data-cy-label="nome"]').should('contain', 'Nome Completo *');
        cy.get('[data-cy-label="cpf"]').should('contain', 'CPF *');
        cy.get('[data-cy-label="rg"]').should('contain', 'RG *');
        cy.get('[data-cy-label="endereco1"]').should('contain', 'Endereço (Linha 1) *');
        cy.get('[data-cy-label="endereco2"]').should('contain', 'Endereço (Linha 2)');
        cy.get('[data-cy-label="contato_principal"]').should('contain', 'Telefone Principal *');
        cy.get('[data-cy-label="contato_secundario"]').should('contain', 'Telefone Secundário');

        cy.get('[data-cy-input="nome"]').should('exist');
        cy.get('[data-cy-input="cpf"]').should('exist');
        cy.get('[data-cy-input="rg"]').should('exist');
        cy.get('[data-cy-input="endereco1"]').should('exist');
        cy.get('[data-cy-input="endereco2"]').should('exist');
        cy.get('[data-cy-input="contato_principal"]').should('exist');
        cy.get('[data-cy-input="contato_secundario"]').should('exist');

        cy.get('[data-cy-button="submit"]').should('exist').and('contain', 'Criar Cadastro');
    });

    it('deve validar campos obrigatórios antes do envio', () => {
        cy.get('[data-cy-button="submit"]').click();

        cy.get('.is-invalid').should('have.length.at.least', 5);

        cy.get('[data-cy-input="nome"]').should('have.class', 'is-invalid');
        cy.get('[data-cy-input="cpf"]').should('have.class', 'is-invalid');
        cy.get('[data-cy-input="rg"]').should('have.class', 'is-invalid');
        cy.get('[data-cy-input="endereco1"]').should('have.class', 'is-invalid');
        cy.get('[data-cy-input="contato_principal"]').should('have.class', 'is-invalid');
    });

    it('deve enviar formulário com dados válidos com sucesso', () => {
        cy.get('[data-cy-input="nome"]').type('Maria Silva Santos');
        cy.get('[data-cy-input="cpf"]').type('12345678900');
        cy.get('[data-cy-input="rg"]').type('123456789');
        cy.get('[data-cy-input="endereco1"]').type('Rua das Flores, 123');
        cy.get('[data-cy-input="endereco2"]').type('Apto 101');
        cy.get('[data-cy-input="contato_principal"]').type('11999999999');
        cy.get('[data-cy-input="contato_secundario"]').type('11888888888');

        cy.intercept('POST', '/api/pacientes', {
            statusCode: 201,
            body: { success: true, message: 'Paciente criado com sucesso' }
        }).as('criarPaciente');

        cy.get('[data-cy-button="submit"]').click();

        cy.wait('@criarPaciente').then((interception) => {
            expect(interception.response.statusCode).to.equal(201);
        });

        cy.get('.alert-success').should('contain', 'Cadastro realizado com sucesso');
    });

    it('deve aplicar máscara de CPF corretamente', () => {
        const cpf = '12345678900';
        const cpfMascarado = '123.456.789-00';

        cy.get('[data-cy-input="cpf"]').type(cpf);
        cy.get('[data-cy-input="cpf"]').blur();
        cy.get('[data-cy-input="cpf"]').should('have.value', cpfMascarado);
    });

    it('deve enviar formulário apenas com campos obrigatórios', () => {
        cy.get('[data-cy-input="nome"]').type('Carlos Oliveira');
        cy.get('[data-cy-input="cpf"]').type('98765432100');
        cy.get('[data-cy-input="cpf"]').blur();
        cy.get('[data-cy-input="rg"]').type('987654321');
        cy.get('[data-cy-input="endereco1"]').type('Av. Paulista, 1000');
        cy.get('[data-cy-input="contato_principal"]').type('11777777777');

        cy.intercept('POST', '/api/pacientes', {
            statusCode: 201,
            body: { success: true }
        }).as('criarPacienteMinimo');

        cy.get('[data-cy-button="submit"]').click();

        cy.wait('@criarPacienteMinimo');
        cy.get('@criarPacienteMinimo').its('request.body').should('include', {
            nome: 'Carlos Oliveira',
            cpf: '987.654.321-00',
            rg: '987654321',
            endereco1: 'Av. Paulista, 1000',
            contato_principal: '11777777777'
        });
    });

    it('deve mostrar mensagem de erro em caso de falha no envio', () => {
        cy.get('[data-cy-input="nome"]').type('Ana Costa');
        cy.get('[data-cy-input="cpf"]').type('11122233344');
        cy.get('[data-cy-input="rg"]').type('112223334');
        cy.get('[data-cy-input="endereco1"]').type('Rua Teste, 123');
        cy.get('[data-cy-input="contato_principal"]').type('11666666666');

        cy.intercept('POST', '/api/pacientes', {
            statusCode: 400,
            body: { error: 'CPF já cadastrado' }
        }).as('criarPacienteErro');

        cy.get('[data-cy-button="submit"]').click();

        cy.wait('@criarPacienteErro');

        cy.get('.alert-danger').should('contain', 'CPF já cadastrado');
    });

    it('deve limpar erros de validação quando usuário começa a digitar', () => {
        cy.get('[data-cy-button="submit"]').click();
        cy.get('[data-cy-input="nome"]').should('have.class', 'is-invalid');
        cy.get('[data-cy-input="nome"]').type('Test');
        cy.get('[data-cy-input="nome"]').should('not.have.class', 'is-invalid');
    });

    it('deve navegar para dashboard após registro bem-sucedido', () => {
        cy.get('[data-cy-input="nome"]').type('João Pereira');
        cy.get('[data-cy-input="cpf"]').type('55566677788');
        cy.get('[data-cy-input="rg"]').type('556667778');
        cy.get('[data-cy-input="endereco1"]').type('Rua Exemplo, 456');
        cy.get('[data-cy-input="contato_principal"]').type('11555555555');

        cy.intercept('POST', '/api/pacientes', {
            statusCode: 201,
            body: { success: true, redirectTo: '/dashboard' }
        }).as('criarPacienteRedirect');

        cy.intercept('GET', '/dashboard', {
            statusCode: 200,
            body: '<h1>Dashboard do Paciente</h1>'
        });

        cy.get('[data-cy-button="submit"]').click();

        cy.wait('@criarPacienteRedirect');
        cy.url().should('include', '/dashboard');
    });
});