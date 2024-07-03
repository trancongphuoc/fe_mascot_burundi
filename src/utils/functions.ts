import { log } from "./log";

export const callbackMyWallet = () => {
    log('function my wallet')
    if (window.flutter_inappwebview && typeof window.flutter_inappwebview.callHandler === 'function') {
      window.flutter_inappwebview.callHandler('callbackMyWallet');
    } else {
      console.log('window.flutter_inappwebview or callHandler is not available');
    }
    return false;
}