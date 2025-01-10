export type PropsStack = {
    Instituicao: { nome: string; id: number };
    Login: undefined;
    Home: undefined;
    Cadastro: undefined;
  };
  
  export type PropsTabs = {
    TabsHome: undefined;
    TabSearch: undefined;
  };
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends PropsStack, PropsTabs {}
     
    }
  }