
declare module 'egg' {
  export interface EggAppConfig {
    cors: {
      origin: string | (() => string);
      allowMethods: string | string[];
    }
  };
}
