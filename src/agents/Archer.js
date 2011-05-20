exports.compose = function(req, res, m, sh) {
  var output = "<!doctype html>\n<html>\n";

  var head = "<head><title>Sterling</title>";
  head += "<link href=\"/c/sterling.css\" rel=\"stylesheet\" />";
  head += "</head>\n";

  var body = "<body><h1>Sterling is on Assignment</h1>";
  body += "<p>Congrats, your Sterling server is up and running.</p>";
  body += "<p>There's no documentation to speak of, yet. I'll fix soon.</p>";
  body += "</body>";
  
  output += head + body + "</html>";

  sh(res, 200,
    {'Content-Length': output.length, 'Content-Type': 'text/html'});
  res.write(output);
  res.end();
}
