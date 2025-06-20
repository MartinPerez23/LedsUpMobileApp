import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: WebViewPage(),
    );
  }
}

class WebViewPage extends StatefulWidget {
  const WebViewPage({super.key});

  @override
  State<WebViewPage> createState() => _WebViewPageState();
}

class _WebViewPageState extends State<WebViewPage> {
  late final InAppWebViewController _controller;
  bool _isLoading = true;
  double _progress = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          InAppWebView(
            initialUrlRequest: URLRequest(
              url: WebUri('https://192.168.0.40:8000'),
            ),
            initialSettings: InAppWebViewSettings(
              javaScriptEnabled: true,
              useOnDownloadStart: true,
              mediaPlaybackRequiresUserGesture: false,
              clearCache: true,
              supportZoom: true,
              useWideViewPort: true,
              builtInZoomControls: true,
              displayZoomControls: false,
              mixedContentMode: MixedContentMode.MIXED_CONTENT_ALWAYS_ALLOW,
              allowsInlineMediaPlayback: true,
            ),
            onWebViewCreated: (controller) {
              _controller = controller;
            },
            onLoadStart: (controller, url) {
              setState(() {
                _isLoading = true;
              });
              debugPrint('Carga iniciada: $url');
            },
            onLoadStop: (controller, url) {
              setState(() {
                _isLoading = false;
              });
              debugPrint('Carga terminada: $url');
            },
            onReceivedError: (controller, request, error)  {
              debugPrint(
                'Error carga: ${error.toString()}'
              );
            },
            onProgressChanged: (controller, progress) {
              setState(() {
                _progress = progress / 100;
              });
            },
            onConsoleMessage: (controller, consoleMessage) {
              debugPrint('Console: ${consoleMessage.message}');
            },
            onReceivedServerTrustAuthRequest: (controller, challenge) async {
              // Ignorar errores SSL (solo desarrollo)
              return ServerTrustAuthResponse(
                action: ServerTrustAuthResponseAction.PROCEED,
              );
            },
          ),
          if (_isLoading)
            Center(child: CircularProgressIndicator(value: _progress)),
        ],
      ),
    );
  }
}
