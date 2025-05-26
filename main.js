const channel_list = ["unsolicited advice"];
const titles = ["chess"];

function nya() {
    const path = window.location.pathname;
    if (path.startsWith("/shorts")) {
        window.location.href = "/";
        return;
    };
    if (path === "/") {
        // yt shorts
        document.querySelectorAll("ytd-rich-section-renderer")
            .forEach(el => el.remove());
        // homepage videos
        document.querySelectorAll("ytd-rich-item-renderer")
                .forEach(video => {
            const title = video.querySelector("#video-title")
                ?.textContent.trim().toLowerCase() || "";
            const channel = video.querySelector("#channel-name a")
                ?.textContent.trim().toLowerCase() || "";
            if (!channel_list.includes(channel) &&
                !titles.some(word => title.includes(word))) {
                video.remove();
            }
        });
    } else if (path.startsWith("/watch")) {
        document.querySelectorAll("yt-lockup-view-model") // sidebar videos
            .forEach(el => el.remove());
        document.querySelectorAll("ytd-reel-shelf-renderer") // yt shorts
            .forEach(el => el.remove());
    };
};
nya();
setInterval(nya, 3000);
window.addEventListener("yt-navigate-finish", nya);
