
declare module 'egg' {
  export interface EggAppConfig {
    cors: {
      origin: string | (() => string);
      allowMethods: string | string[];
      exposeHeaders?: string | string[];
      allowHeaders?: string | string[];
      maxAge?: string | number;
      credentials?: boolean;
      keepHeadersOnError?: boolean;
    }
  };
}
