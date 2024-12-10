'use client'

import { ArrowCircleRight, ArrowDown, ArrowUp } from "phosphor-react";
import { ContainerBalance, ContainerExtract, ContainerOperation, ContainerPage, DateExtract, DescriptionOperation, Extract, Extracts, Operations, TitleBalance, TitleExtract, TitleOperation, ValueBalance, ValueExtract } from "./style";
import * as Dialog from "@radix-ui/react-dialog";
import { ButtonCloseModal, ContentModal, FormModal, MessageError, StyledContent, StyledDescription, StyledOverlay, StyledTitle } from "../../Login/style";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";

const schemaOperation = z.object({
  name: z.string().min(5, 'O nome deve conter no mínimo 5 caracteres'),
  value: z
    .string()
    .transform((val) => parseFloat(val)) // Converte string para número
    .refine((val) => !isNaN(val), 'Valor inválido'), // Garante que seja um número válido
});

interface Extract {
  id: number;
  action_name: string;
  created_at: string; // A data vem no formato "YYYY-MM-DD HH:MM:SS"
  value: number;
  type: 'entrada' | 'saida' | 'transferencia';
}

type OperationFormData = z.infer<typeof schemaOperation>

export default function Start() {
  const [extracts, setExtracts] = useState<Extract[]>([]);
  const [balance, setBalance] = useState()

  const {register, handleSubmit, formState: {errors}} = useForm<OperationFormData>({
    resolver: zodResolver(schemaOperation)
  })

  const api = 'http://localhost:3001/api'

  async function handleNewOperation(data: OperationFormData, type: 'entrada' | 'saida' | 'transferencia') {
    const token = localStorage.getItem('userId');
  
    if (!token) {
      alert('Usuário não autenticado!');
      return;
    }
  
    const userId = parseInt(token, 10);
  
    const operation = {
      user_id: userId,
      action_name: data.name,
      value: data.value,
      type
    };
  
    const operationBalance = {
      user_id: userId,
      value: data.value,
      type
    };
  
    try {
      // Executa as operações em sequência
      const extractResponse = await axios.post(`${api}/extracts`, operation);
      const balanceResponse = await axios.post(`${api}/users/update-balance`, operationBalance);
  
      // Verifica se as operações foram bem-sucedidas
      if (extractResponse.status === 201 && balanceResponse.status === 200) {
        alert('Operação realizada com sucesso!');
        window.location.reload();
      }
    } catch (error: any) {
      // Tratamento mais específico dos erros
      if (error.response) {
        // O servidor respondeu com um status de erro
        switch (error.response.status) {
          case 400:
            alert(error.response.data.message || 'Dados inválidos. Verifique os valores informados.');
            break;
          case 404:
            alert('Usuário não encontrado.');
            break;
          case 500:
            alert('Erro no servidor. Tente novamente mais tarde.');
            break;
          default:
            alert(error.response.data.message || 'Erro ao realizar operação. Tente novamente.');
        }
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        alert('Erro de conexão. Verifique sua internet e tente novamente.');
      } else {
        // Erro na configuração da requisição
        alert('Erro ao processar sua solicitação. Tente novamente.');
      }
      return null;
    }
  }


  useEffect(() => {
    const fetchExtracts = async () => {
      const token = localStorage.getItem('userId');
  
      if (!token) {
        alert('Usuário não autenticado!');
        return;
      }
    
      const userId = parseInt(token, 10);

      try {
        const response = await axios.get(`http://localhost:3001/api/extracts/user/${userId}`);
        setExtracts(response.data); // Armazena os extratos no estado
      } catch (error) {
        console.error('Erro ao buscar extratos:', error);
      }
    };
    
    fetchExtracts();

    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('userId');
  
        if (!token) {
          return alert('Usuário não autenticado!');
        }
  
        const userId = parseInt(token, 10); // Converte para inteiro
  
        const response = await axios.get(`${api}/users/${userId}/balance`);
        
        // Certifique-se de acessar a propriedade 'balance' corretamente.
        setBalance(response.data.balance); // Agora o balance é um número
  
      } catch (error) {
        console.error('Erro ao buscar extratos:', error);
      }
    }
  
    fetchBalance();
  }, []); // O array vazio faz com que a função seja chamada apenas uma vez, quando o componente for montado

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };


    return (
      <ContainerPage>
        <ContainerBalance>
          <TitleBalance>Saldo disponível</TitleBalance>
          <ValueBalance>R$ {Number(balance).toFixed(2)}</ValueBalance>
        </ContainerBalance>
        <Operations>
          <Dialog.Root>
              <Dialog.Trigger asChild>
                <ContainerOperation className="NewEntry">
                  <ArrowUp size={44}/>
                  <div>
                    <TitleOperation>Nova Entrada</TitleOperation>
                    <DescriptionOperation>Adicionar dinheiro</DescriptionOperation>
                  </div>
                </ContainerOperation>
              </Dialog.Trigger>
              <Dialog.Portal>
                <StyledOverlay />
                <StyledContent>
                  <StyledTitle>Depósito</StyledTitle>
                  <StyledDescription>
                    Faça um depósito na sua conta
                  </StyledDescription>
                  <ContentModal>
                    <FormModal onSubmit={handleSubmit((data) => { 
                      handleNewOperation(data, 'entrada'); 
                    })}>
                      <Input TextLabel="Nome da operação" TextPlaceholder="Digite o nome da operação..." {...register('name')}/>
                      {errors.name && <MessageError>{errors.name.message}</MessageError>}
                      <Input TextLabel="Valor da operação" TextPlaceholder="R$ 1200,00" type="number" {...register('value')}/>
                      {errors.value && <MessageError>{errors.value.message}</MessageError>}
                      <Button text='Confirmar' type='submit'/>
                    </FormModal> 
                    <Dialog.Close asChild>
                      <ButtonCloseModal>Fechar</ButtonCloseModal>
                    </Dialog.Close>
                  </ContentModal>
                </StyledContent>
              </Dialog.Portal>
            </Dialog.Root>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <ContainerOperation className="NewExit">
                  <ArrowDown size={44}/>
                  <div>
                    <TitleOperation>Nova Saída</TitleOperation>
                    <DescriptionOperation>Realizar pagamento</DescriptionOperation>
                  </div>
                </ContainerOperation>
              </Dialog.Trigger>
              <Dialog.Portal>
                <StyledOverlay />
                <StyledContent>
                  <StyledTitle>Saída</StyledTitle>
                  <StyledDescription>
                    Efetue um pagamento
                  </StyledDescription>
                  <ContentModal>
                    <FormModal onSubmit={handleSubmit((data) => { 
                      handleNewOperation(data, 'saida'); 
                    })}>
                      <Input TextLabel="Nome da operação" TextPlaceholder="Digite o nome da operação..." {...register('name')}/>
                      {errors.name && <MessageError>{errors.name.message}</MessageError>}
                      <Input TextLabel="Valor da operação" TextPlaceholder="R$ 1200,00" type="number" {...register('value')}/>
                      {errors.value && <MessageError>{errors.value.message}</MessageError>}
                      <Button text='Confirmar' type='submit'/>
                    </FormModal> 
                    <Dialog.Close asChild>
                      <ButtonCloseModal>Fechar</ButtonCloseModal>
                    </Dialog.Close>
                  </ContentModal>
                </StyledContent>
              </Dialog.Portal>
            </Dialog.Root>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <ContainerOperation className="Transfer">
                  <ArrowCircleRight size={44}/>
                  <div>
                    <TitleOperation>Transferência</TitleOperation>
                    <DescriptionOperation>Enviar dinheiro</DescriptionOperation>
                  </div>
                </ContainerOperation>
              </Dialog.Trigger>
              <Dialog.Portal>
                <StyledOverlay />
                <StyledContent>
                  <StyledTitle>Transferência</StyledTitle>
                  <StyledDescription>
                    Realize uma transferência
                  </StyledDescription>
                  <ContentModal>
                    <FormModal onSubmit={handleSubmit((data) => { 
                      handleNewOperation(data, 'transferencia'); 
                    })}>
                      <Input TextLabel="Nome da operação" TextPlaceholder="Digite o nome da operação..." {...register('name')}/>
                      {errors.name && <MessageError>{errors.name.message}</MessageError>}
                      <Input TextLabel="Valor da operação" TextPlaceholder="R$ 1200,00" type="number" {...register('value')}/>
                      {errors.value && <MessageError>{errors.value.message}</MessageError>}
                      <Button text='Confirmar' type='submit'/>
                    </FormModal> 
                    <Dialog.Close asChild>
                      <ButtonCloseModal>Fechar</ButtonCloseModal>
                    </Dialog.Close>
                  </ContentModal>
                </StyledContent>
              </Dialog.Portal>
            </Dialog.Root>
        </Operations>
        <Extract>Extrato</Extract>
        <Extracts>
        {extracts.map((extract) => (
          <ContainerExtract key={extract.id}>
            <div>
              <TitleExtract>{extract.action_name}</TitleExtract>
              <DateExtract>{formatDate(extract.created_at)}</DateExtract>
            </div>
            <ValueExtract className={extract.type === 'entrada' ? 'Entry' : 'Exit'}>
              R$ {Number(extract.value).toFixed(2)}
            </ValueExtract>
          </ContainerExtract>
        ))}
        </Extracts>
      </ContainerPage>
    );
}