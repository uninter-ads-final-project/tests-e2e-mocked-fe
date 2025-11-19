import {Button, Card, CardBody, CardFooter, CardHeader, Container, FormControl, FormLabel} from "react-bootstrap";
import {useState} from "react";

export const LoginPage = () => {

    const [formUser, setFormUser] = useState({username: null, password: null})
    const [isLogInFailed, setIsLogInFailed] = useState(false)

    const registeredUsers = [
        {username: 'paciente01@gmail.com', password: '1234567'},
        {username: 'paciente02@gmail.com', password: '2345678'},
        {username: 'profissionalsaude01@gmail.com', password: 'saude01'},
        {username: 'profissionalsaude01@gmail.com', password: 'saude02'},
        {username: 'adm01@gmail.com', password: 'masterAdm'},
    ]

    const handleLogin = () => {
        const user = registeredUsers.find(user => user.username === formUser.username)

        console.log(user?.password === formUser.password)

        if (user?.password === formUser.password) {
            setIsLogInFailed(false)
            return
        }

        return setIsLogInFailed(true)

    }


    return (
        <Container>
            <h1>Vita Plus</h1>

            {!!formUser.username && !!formUser.password && isLogInFailed &&
                <Card className='bg-danger my-5'>
                    <CardBody>
                        Usuário ou senha incorreto
                    </CardBody>
                </Card>
            }
            <Card>
                <CardHeader>
                    Entrar
                </CardHeader>
                <CardBody>
                    <FormLabel htmlFor='username' data-cy-label='username'>Email</FormLabel>
                    <FormControl type="text" id='username' data-cy-input='username'
                                 onBlur={(e: any) => setFormUser((prev) => ({
                                     ...prev,
                                     username: e.target.value
                                 }))}/>

                    <FormLabel htmlFor='password' data-cy-label='password'>Senha</FormLabel>
                    <FormControl type="password" id='password' data-cy-input='username'
                                 onBlur={(e: any) => setFormUser((prev) => ({
                                     ...prev,
                                     password: e.target.value
                                 }))}/>
                </CardBody>
                <CardFooter className={"gap-3 d-flex align-items-center justify-content-end"}>
                    <a href="#" data-cy-button='forgot_password'>Esqueci minha senha</a>
                    <Button type='submit' onClick={handleLogin} data-cy-button='login'>Entrar</Button>
                </CardFooter>
            </Card>


        </Container>
    )
}