import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_inappwebview_platform_interface/flutter_inappwebview_platform_interface.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await _prepararCSRF();
  runApp(const MyApp());
}

Future<void> _prepararCSRF() async {
  try {
    final uri = Uri.parse('https://ledsupwebserver.onrender.com/csrf/');
    final response = await http.get(uri);

    if (response.statusCode == 200) {
      final setCookie = response.headers['set-cookie'];
      if (setCookie != null) {
        final csrf = _extraerCSRF(setCookie);
        if (csrf != null) {
          final cookieManager = CookieManager.instance();
          await cookieManager.setCookie(
            url: WebUri(uri.toString()), // 👈 importante
            name: 'csrftoken',
            value: csrf,
            domain: 'ledsupwebserver.onrender.com',
            path: '/',
            isSecure: true,
          );
        }
      }
    }
  } catch (e) {
    debugPrint('Error al preparar CSRF: $e');
  }
}

String? _extraerCSRF(String rawCookies) {
  final match = RegExp(r'csrftoken=([^;]+)').firstMatch(rawCookies);
  return match?.group(1);
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
              url: WebUri('https://ledsupwebserver.onrender.com/'),
              headers: {
                "Referer": "https://ledsupwebserver.onrender.com/"
              },
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
            onReceivedError: (controller, request, error) {
              debugPrint('Error carga: ${error.toString()}');
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
