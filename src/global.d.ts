interface Window {
    flutter_inappwebview?: {
      callHandler: (handlerName: string, ...args: any[]) => void;
    };
}

declare module 'react-lazy-load-image-component';