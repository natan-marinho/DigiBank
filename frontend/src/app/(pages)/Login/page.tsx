'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Input from "@/app/components/Input";
import { Logo, Slogan } from "../(System)/layoutStyle";
import { Background, BoxLogin, ButtonCloseModal, ContainerLogin, ContentModal, FormModal, Instructions, MessageError, MessageModal, MessageUser, StyledContent, StyledDescription, StyledOverlay, StyledTitle } from "./style";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const schemaLogin = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres')
})

const schemaRegister = schemaLogin;

type LoginFormData = z.infer<typeof schemaLogin>;
type RegisterFormData = z.infer<typeof schemaRegister>;

export default function Login() {
    const router = useRouter();

    const { register: loginRegister, 
        handleSubmit: handleSubmitLogin, 
        formState: {errors: loginErrors} } = useForm<LoginFormData>({
        resolver: zodResolver(schemaLogin)
    })

    const { register: registerRegister, 
        handleSubmit: handleSubmitRegister, 
        formState: {errors: registerErrors} } = useForm<RegisterFormData>({
        resolver: zodResolver(schemaRegister)
    })

    const api = 'http://localhost:3001/api'


    async function handleLoginUser(data: LoginFormData) {
        try {
            const response = await axios.post(`${api}/users/login`, data);
            const { id } = response.data; // Recebe o id do backend
    
            localStorage.setItem('userId', id); // Armazena o id no localStorage
            alert('Login realizado com sucesso');
    
            router.push('/Home'); // Redireciona para a página Home
    
            return true;
        } catch (error: any) {
            alert(error.response?.data.message || 'Erro ao efetuar login. Tente novamente.');
            return null; // Retorna null em caso de falha
        }
    }
    

    async function handleRegisterUser(data: RegisterFormData) {
        try {
            const response = await axios.post(`${api}/users`, data)
            alert('Usuário criado com sucesso! Faça login para acessar.');
            return response.data; // Retorna os dados do usuário criado
        } catch (error: any) {
            alert(error.response?.data.message || 'Erro ao criar usuário. Tente novamente.');
            return null; // Retorna null em caso de falha
        }
    }

    return (
        <ContainerLogin>
            <Background>
                <div className="circle circle1"></div>
                <div className="circle circle2"></div>
                <div className="circle circle3"></div>
                <div className="circle circle4"></div>
                <BoxLogin>
                    <Logo />
                    <Slogan>DigiBank</Slogan>
                    <MessageUser>Bem-vindo de volta!</MessageUser>
                    <Instructions>Entre com suas credenciais para acessar sua conta</Instructions>
                    <form id='FormLogin' onSubmit={handleSubmitLogin(handleLoginUser)}>
                        <Input TextLabel="Email" TextPlaceholder="Digite o seu email..." {...loginRegister('email')} />
                        {loginErrors.email && <p>{loginErrors.email.message}</p>}
                        <Input TextLabel="Senha" TextPlaceholder="Digite a sua senha..." {...loginRegister('password')} />
                        {loginErrors.password && <p>{loginErrors.password.message}</p>}
                    </form>

                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <MessageModal>Esqueceu a senha?</MessageModal>  
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <StyledOverlay />
                            <StyledContent>
                                <StyledTitle>Recuperação de senha</StyledTitle>
                                <StyledDescription>
                                    Em breve adicionaremos essa funcionalidade!
                                </StyledDescription>
                                <Dialog.Close asChild>
                                    <Button text="Fechar" type="button" />
                                </Dialog.Close>
                            </StyledContent>
                        </Dialog.Portal>
                    </Dialog.Root>

                    <Button text="Entrar" type="submit" form='FormLogin'/>

                    {/* Radix Dialog */}
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <MessageModal>Ainda não tem conta? Cadastre-se</MessageModal>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <StyledOverlay />
                            <StyledContent>
                                <StyledTitle>Cadastro</StyledTitle>
                                <StyledDescription>
                                    Crie sua conta no DigiBank e aproveite os benefícios!
                                </StyledDescription>
                                <ContentModal>
                                    <FormModal onSubmit={handleSubmitRegister(handleRegisterUser)}>
                                        <Input TextLabel="Email" TextPlaceholder="Digite o seu email..." {...registerRegister('email')}/>
                                        {registerErrors.email && <MessageError>{registerErrors.email.message}</MessageError>}
                                        <Input TextLabel="Senha" TextPlaceholder="Crie uma senha..." {...registerRegister('password')}/>
                                        {registerErrors.password && <MessageError>{registerErrors.password.message}</MessageError>}
                                        <Button text='Cadastrar' type='submit'/>
                                    </FormModal> 
                                    <Dialog.Close asChild>
                                        <ButtonCloseModal>Fechar</ButtonCloseModal>
                                    </Dialog.Close>
                                </ContentModal>
                            </StyledContent>
                        </Dialog.Portal>
                    </Dialog.Root>

                </BoxLogin>
            </Background>   
        </ContainerLogin>
    );
}