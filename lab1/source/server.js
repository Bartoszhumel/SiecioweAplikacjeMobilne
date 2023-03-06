const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
    video= URLSearchParams.get("videoFile")
    audio = URLSearchParams.get("audioFile")
    const video1 = document.createElement('video');
    video1.src = video;
    res.send(<video>  <source src=video type="video/mp4"></video>)

})

app.listen(4080)
