export type PropsStack = {
    Login: undefined;
    Dashboard: undefined;
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