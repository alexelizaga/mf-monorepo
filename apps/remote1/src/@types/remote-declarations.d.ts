// 👇 Para todos los remotos que importes por Module Federation
declare module 'host/store' {
  export const useAppStore: any;
  export const appStore: any;
}
