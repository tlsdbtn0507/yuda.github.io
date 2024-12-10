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
}
