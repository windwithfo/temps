import 'dart:io';

Future main(List<String> args) async {
  final HttpServer server =
      await HttpServer.bind(InternetAddress.loopbackIPv4, 8080);

  print('Listening on localhost:${server.port}');

  await for (var request in server) {
    handleRequest(request);
  }
}

void handleRequest(HttpRequest request) {
  try {
    if (request.method == 'GET') {
      handleGet(request);
    } else {
      print(request.uri.toString());
      // ···
    }
  } catch (e) {
    print('Exception in handleRequest: $e');
  }
  // print('Request handled.');
}

void handleGet(HttpRequest request) {
  final String path = request.uri.path.substring(1);
  final String fileName = path.length == 0 ? 'index.html' : path;
  final File targetFile = File(fileName);
  final guess = request.uri.queryParameters['q'];
  final response = request.response;
  if (targetFile.existsSync()) {
    final String extName = fileName.substring(fileName.lastIndexOf('.') + 1,
        fileName.indexOf('?') > 0 ? fileName.indexOf('?') : fileName.length);
    switch (extName) {
      case 'html':
        response.headers.contentType = ContentType.html;
        break;
      case 'png':
        response.headers.contentType = ContentType.parse('image/png');
        break;
      case 'json':
        response.headers.contentType = ContentType.json;
        break;
      case 'js':
        response.headers.contentType = ContentType.parse('text/javascript');
        break;
      case 'css':
        response.headers.contentType = ContentType.parse('text/css');
        break;
      case 'otf':
        response.headers.contentType =
            ContentType.parse('application/x-font-otf');
        break;
      case 'ttf':
        response.headers.contentType =
            ContentType.parse('application/x-font-ttf');
        break;
      default:
        response.headers.contentType = ContentType.text;
    }
    targetFile.openRead().pipe(response);
  } else {
    response.statusCode = HttpStatus.ok;
    response
      ..writeln('requert $guess')
      ..close();
  }
}
