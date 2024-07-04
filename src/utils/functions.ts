import { log } from "./log";
type FlutterMessage = 'callbackMyWallet' | 'callbackDisableLoading'

export const callbackFlutter = (flutterMessage: FlutterMessage) => {
    log('function my wallet')
    if (window.flutter_inappwebview && typeof window.flutter_inappwebview.callHandler === 'function') {
      window.flutter_inappwebview.callHandler(flutterMessage);
    } else {
      // console.log('window.flutter_inappwebview or callHandler is not available');
    }
    return false;
}