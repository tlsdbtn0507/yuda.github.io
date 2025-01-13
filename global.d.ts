export {};

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        [name: string]: {
          postMessage: (message: any) => void;
        };
      };
    };
  }
  interface Window {
    confirmCallback: (result: boolean) => void;
  }
}
