
var express = require('express');
const url = require('url');


var app = express();

app.get('/', (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const videoFile = queryObject.videoFile;
  const audioFile = queryObject.audioFile;
  const imgFile = queryObject.posterFile;
  let player;

  if(videoFile&&audioFile)
  {
    player = `<video id="videoPlayer" src="${videoFile}" controls></video>
              <audio id="audioPlayer" src="${audioFile}" controls></audio>`;
  }
  if (videoFile) {
    player = `<video id="videoPlayer" src="${videoFile}" controls></video>`;
  } else if (audioFile) {
    player = `<audio id="audioPlayer" src="${audioFile}" controls></audio>`;
  } else {
    player = 'No media file specified.';
  }
  let image;
  if(imgFile){
    image = `<img id="posterImage" src="${imgFile}"></img>`
  }

  script =`const button1 = document.getElementById('videoCancel');
  button1.addEventListener('click', function(e) {
    const video = document.getElementById('videoPlayer');
    video.setAttribute('src','cancel.mp4')
  });
  const button2 = document.getElementById('audioCancel');
  button2.addEventListener('click', function(e) {
    const audio = document.getElementById('audioPlayer');
    audio.setAttribute('src','cancel.mp3)
  });
  `
  const html = `
    <html>
      <head>
        <title>Hello World Player</title>
      </head>
      <body>
        ${player}
        ${image}
        <button id="videoCancel">Video Cancel</button>
        <button id="audioCancel">Audio Cancel</button>
      </body>
      <script>
        ${script}
      </script>
    </html>
  `;

  res.send(html);
});

app.listen(4080)
