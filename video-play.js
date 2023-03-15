const videoPlayer = document.getElementById("videoPlayer");
const videoSource = "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"; // Substitua pelo seu arquivo M3U8

if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource(videoSource);
  hls.attachMedia(videoPlayer);
} else if (videoPlayer.canPlayType("application/vnd.apple.mpegurl")) {
  videoPlayer.src = videoSource;
}

videoPlayer.play();