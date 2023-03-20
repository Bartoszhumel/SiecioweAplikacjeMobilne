
var express = require('express');
const url = require('url');


var app = express();

app.get('/', (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const videoFile = queryObject.videoFile;
  const audioFile = queryObject.audioFile;
  let player;

  if (videoFile) {
    player = `<video id="videoPlayer" src="${videoFile}" controls></video>`;
  } else if (audioFile) {
    player = `<audio id="audioPlayer" src="${audioFile}" controls></audio>`;
  } else {
    player = 'No media file specified.';
  }

  const html = `
    <html>
      <head>
        <title>Hello World Player</title>
      </head>
      <body>
        ${player}
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(4080)
