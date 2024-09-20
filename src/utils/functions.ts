type FlutterMessage = 'callbackMyWallet' | 'callbackDisableLoading';

export const callbackFlutter = (flutterMessage: FlutterMessage): boolean => {
  // Check for Flutter InAppWebView (usually for Flutter apps)
  if (window.flutter_inappwebview && typeof window.flutter_inappwebview.callHandler === 'function') {
    window.flutter_inappwebview.callHandler(flutterMessage);
    return true; // Message was handled
  }

  // Check for WKWebView (usually for iOS apps)
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[flutterMessage]) {
    window.webkit.messageHandlers[flutterMessage].postMessage(flutterMessage);
    return true; // Message was handled
  }

  // Check for Android WebView
  if (window.AndroidWebView && typeof window.AndroidWebView.postMessage === 'function') {
    window.AndroidWebView.postMessage(flutterMessage);
    return true; // Message was handled
  }

  // Log if none of the WebView types are available
  console.log('No WebView handler available (Flutter, WKWebView, or Android WebView)');
  return false; // Message was not handled
};
