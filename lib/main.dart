import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:http/http.dart' as http;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      // o Colors.black si quieres negro sólido
      statusBarIconBrightness: Brightness.light,
      // iconos blancos
      statusBarBrightness: Brightness.dark,
    ),
  );
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
            url: WebUri(uri.toString()),
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
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: Colors.transparent,
      ),
      home: const WebViewPage(),
    );
  }
}


class WebViewPage extends StatefulWidget {
  const WebViewPage({super.key});

  @override
  State<WebViewPage> createState() => _WebViewPageState();
}

class _WebViewPageState extends State<WebViewPage> {
  late InAppWebViewController _controller;
  bool _isLoading = true;
  double _progress = 0;
  bool _hasError = false;

  @override
  Widget build(BuildContext context) {
    final padding = MediaQuery
        .of(context)
        .padding;

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.light,
        statusBarBrightness: Brightness.dark,
      ),
      child: Scaffold(
        body: SafeArea(
          child: Column(
            children: [
              Expanded(
                child: Stack(
                  children: [
                    InAppWebView(
                      initialUrlRequest: URLRequest(
                        url: WebUri('https://ledsupwebserver.onrender.com/'),
                        headers: {
                          "Referer": "https://ledsupwebserver.onrender.com/",
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
                        mixedContentMode:
                        MixedContentMode.MIXED_CONTENT_ALWAYS_ALLOW,
                        allowsInlineMediaPlayback: true,
                      ),
                      onWebViewCreated: (controller) {
                        _controller = controller;
                      },
                      onLoadStart: (controller, url) {
                        setState(() {
                          _isLoading = true;
                          _hasError = false;
                        });
                      },
                      onLoadStop: (controller, url) {
                        setState(() {
                          _isLoading = false;
                        });
                      },
                      onReceivedError: (controller, request, error) {
                        debugPrint('Error carga: ${error.toString()}');
                        setState(() {
                          _isLoading = false;
                          _hasError = true;
                        });
                      },
                      onProgressChanged: (controller, progress) {
                        setState(() {
                          _progress = progress / 100;
                        });
                      },
                      onConsoleMessage: (controller, consoleMessage) {
                        debugPrint('Console: ${consoleMessage.message}');
                      },
                      onReceivedServerTrustAuthRequest:
                          (controller, challenge) async {
                        return ServerTrustAuthResponse(
                          action: ServerTrustAuthResponseAction.PROCEED,
                        );
                      },
                    ),

                    // Loader
                    if (_isLoading && !_hasError)
                      Center(
                          child: CircularProgressIndicator(value: _progress)),

                    // Error
                    if (_hasError)
                      Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            // Image.asset('assets/error_icon.png', width: 100), // si querés
                            const Text(
                              'No se pudo cargar la página',
                              style: TextStyle(fontSize: 16),
                            ),
                            const SizedBox(height: 10),
                            ElevatedButton(
                              onPressed: () {
                                setState(() {
                                  _hasError = false;
                                  _isLoading = true;
                                });
                                _controller.reload();
                              },
                              child: const Text('Reintentar'),
                            ),
                          ],
                        ),
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

