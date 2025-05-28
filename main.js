// ==UserScript==
// @name         Youtube Video Filter
// @namespace    http://tampermonkey.net/
// @version      2025-05-28
// @description  Filter useless videos from youtube
// @author       Takaso
// @match        https://www.youtube.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

const channel_list = ["unsolicited advice"];
const titles = ["chess"];

(function() {
    const key = "nya_filter_notif_shown"; // we'll add it in the local storage so that it appears once
    if (!localStorage.getItem(key)) {
        const banner = document.createElement("div");
        banner.textContent = "The code will filter out all unnecessary videos, the page may seem buggy in the process";
        Object.assign(banner.style, {
            position: "fixed",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.8)",
            color: "#fff",
            padding: "12px 20px",
            "font-family": "sans-serif",
            "font-size": "14px",
            "border-radius": "6px",
            "z-index": 9999,
            opacity:  "0",
            transition: "opacity 0.5s ease"
        });
        document.body.appendChild(banner);
        requestAnimationFrame(() => banner.style.opacity = "1");
        setTimeout(() => {
            banner.style.opacity = "0";
            banner.addEventListener("transitionend", () => banner.remove(), { once: true });
        }, 4000);
        localStorage.setItem(key, "true");
    }
})();


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

// patch addEventListener so that touchstart is always passive
(function() {
    const orig = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, opts) {
    if (type === "touchstart") {
        if (typeof opts === "object") {
        opts.passive = true;
        } else {
        // if opts is boolean (capture flag), convert to object:
        opts = { passive: true, capture: Boolean(opts) };
        }
    }
    return orig.call(this, type, listener, opts);
    };
})();

nya();
setInterval(nya, 3000);
