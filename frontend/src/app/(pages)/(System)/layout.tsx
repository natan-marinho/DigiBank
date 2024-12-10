'use client'

import { ButtonPages, ContainerLayout, ContainerLogo, ContainerUser, Content, ExitButtonContainer, Header, Logo, NavLinks, SideBar, Slogan } from "./layoutStyle";
import "../../globals.css";
import Link from "next/link";
import { User } from "phosphor-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <ContainerLayout>
          <Header>
            <ContainerLogo>          
              <Logo />
              <Slogan>DigiBank</Slogan>
            </ContainerLogo>
            <ContainerUser>
              Olá, Natan Oliveira
              <User size={28} />
            </ContainerUser>
          </Header>
          <SideBar>
              <NavLinks>
                  <Link href="http://localhost:3000/Home"><ButtonPages>Início</ButtonPages></Link>
                  <Link href="http://localhost:3000/Shortly"><ButtonPages>Extrato</ButtonPages></Link>
                  <Link href="http://localhost:3000/Shortly"><ButtonPages>Cartões</ButtonPages></Link>  
                  <Link href="http://localhost:3000/Shortly"><ButtonPages>Investimentos</ButtonPages></Link>
              </NavLinks>
              <ExitButtonContainer>
                  <Link href="http://localhost:3000"><ButtonPages>Sair</ButtonPages></Link>
              </ExitButtonContainer>
          </SideBar>
          <Content>
            {children}
          </Content>
        </ContainerLayout>
  );
}