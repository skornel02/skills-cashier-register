import http from 'node:http';

const port = 8998;

function getBody(request) {
  return new Promise((resolve) => {
    const bodyParts = [];
    let body;
    request.on('data', (chunk) => {
      bodyParts.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(bodyParts).toString();
      resolve(body)
    });
  });
}

// Create a local server to receive data from
const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log('Request:', method, url);
  console.log('Headers:', req.headers);

  const body = await getBody(req);
  let parsed = {};

  try {
    parsed = JSON.parse(body);
    console.log("Parsed body:", parsed);
  } catch {
    console.log('Body:', body);
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    transactionId: parsed?.id,
    totalAmount: parsed?.totalAmount,
    totalCount: parsed?.items?.length,
    success: true,
    message: 'Order received',
  }));
});

console.log(`Server listening on port ${port}`);
server.listen(port);