document.addEventListener("DOMContentLoaded", function() {
    const channelSelect = document.getElementById('channelSelect');
    const videoPlayer = document.getElementById('videoPlayer');
    const playButton = document.getElementById('playButton');
    let channelList = [];

    // Load the channel list from the channels.txt file
    fetch('B.txt')
        .then(response => response.text())
        .then(data => {
            // Split the txt file by line and populate the channel list
            const channels = data.trim().split('\n');
            channels.forEach((channel, index) => {
                const [name, url] = channel.split(',');
                channelList.push({ name, url });
                const option = document.createElement('option');
                option.value = index;
                option.textContent = name;
                channelSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading channels:', error));

    // When the play button is clicked, play the selected channel
    playButton.addEventListener('click', function() {
        const selectedChannel = channelList[channelSelect.value].url;
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(selectedChannel);
            hls.attachMedia(videoPlayer);
            videoPlayer.play();
        } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
            videoPlayer.src = selectedChannel;
            videoPlayer.play();
        } else {
            alert('Your browser does not support m3u8 playback.');
        }
    });
});
