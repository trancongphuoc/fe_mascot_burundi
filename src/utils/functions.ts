export const callbackMyWallet = () => {
    if (window.flutter_inappwebview && typeof window.flutter_inappwebview.callHandler === 'function') {
      window.flutter_inappwebview.callHandler('callbackMyWallet');
    } else {
      console.log('window.flutter_inappwebview or callHandler is not available');
    }
    return false;
}