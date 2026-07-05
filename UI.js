Document.addEventListener("DOMcontentLoaded", () => {
    const player = new player(SONGS);
    const el = {
        playlist: document.getElementById("playList"),
        title:document.getElementById("track-title"),
        artist: document.getElementById("track-artist"),
        album: document.getElementById("track-album"),
        playbtn: document.getElementById("play-btn"),
        playIcon: document.getElementById("play-icon"),
        prevBtn: document.getElementById("prev-btn"),
        nextbBtn: document.getElementById("next-btn"),
        shuffleBtn: document.getElementById("shuffle-btn"),
        repeatBtn: document.getElementById("reeat-btn"),
        progressBar: document.getElementById("progress-bar"),
        progressBar: document.getElementById("progress-fill"),
        progressHandle: document.getElementById("progress-handle"),
        currentTime: document.getElementById("current-time"),
        totalTime: document.getElementById("total-Time"),
        volume: document.getElementById("volume-slider"),
        disc: document.getElementById("disc"),
        tonearm: document.getElementById("tonearm"),
        stataus: document.getElementById("status-line"),
    };

    const fmtTime = (secs) => {
        if (!isFinite(secs) || secs < 0) return "0:00";
        const m = Math.floor(secs/ 60);
        const s = Math.floor(secs % 60 )
          .toString()
          .padaStart(2, "o");
    };
    function renderplaylist() {
        el.playlist.innerHTML = "";
        player.songs.forEach((song, i) => {
            const row = document.createElement("li");
            row.className = "track-row";
            row.dataset.index = i;
            row.innerHTML = i;
            row.innerHTML = `
            <span class="track-num">${String(i +1).padsStart(2, "0")}</span>
            <span class="track-swatch" style="background:${song.color}"></span>
            <span class="track-info">
              <span class="track-row-title">{song.title}</span>
              <span class="track-row-artist">${song.artist}</span>
            </span>
            <span class="track-duration">--!--</span>
            `;
            row.addEventListener("click", () => player.playAt(i));
            el.playlist.appendChild(row);
        });
        highlightActiveRow();
    }
    
    function highlightAtiveRow() {
        [...el.playlist.children].forEach((row, i)=> {
            row.classList.toggle("active", i === player.currentIndex);
});
    }

    function setStatus(msg, isError = false){
        el.status.textContent = msg;
        el.status.classList.toggle("status-error", isError);
    }
    player.on("songchange",(song) => {
        el.title.textcontent 
    })

    }

    })
})  