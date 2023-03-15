const videoPlayer = document.getElementById("videoPlayer");
const videoSource = "http://example.com/example.m3u8"; // Substitua pelo seu arquivo M3U8

if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource(videoSource);
  hls.attachMedia(videoPlayer);
} else if (videoPlayer.canPlayType("application/vnd.apple.mpegurl")) {
  videoPlayer.src = videoSource;
}

videoPlayer.play();


const castButton = document.getElementById("castButton");

castButton.addEventListener("click", () => {
  const mediaInfo = new chrome.cast.media.MediaInfo(videoSource, "application/x-mpegURL");
  const request = new chrome.cast.media.LoadRequest(mediaInfo);
  chrome.cast.sessionManager.requestSession((session) => {
    session.loadMedia(request);
  });
});


window['__onGCastApiAvailable'] = (isAvailable) => {
    if (isAvailable) {
      const castButton = document.getElementById("castButton");
      castButton.style.display = "block";
      castButton.disabled = false;
    }
  };
  
const initializeCastApi = () => {
    const sessionRequest = new chrome.cast.SessionRequest("8B47553E");
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, (session) => {}, (status) => {});
    chrome.cast.initialize(apiConfig, () => {});
};

initializeCastApi();
