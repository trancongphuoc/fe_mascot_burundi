// global.d.ts

type FlutterMessage = 'callbackMyWallet' | 'callbackDisableLoading';

interface FlutterInAppWebView {
  callHandler: (message: FlutterMessage) => void;
}

interface WebKitMessageHandlers {
  [key: string]: { postMessage: (message: FlutterMessage) => void };
}

interface AndroidWebView {
  postMessage: (message: FlutterMessage) => void;
}

// Extend the Window interface to include custom properties
declare global {
  interface Window {
    flutter_inappwebview?: FlutterInAppWebView;
    webkit?: { messageHandlers: WebKitMessageHandlers };
    AndroidWebView?: AndroidWebView;
  }
}

export {};
