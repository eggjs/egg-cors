
declare module 'egg-cors' {
  export interface Config {
    cors: {
      origin: string | (() => string);
      allowMethods: string | string[];
    }
  };
}
