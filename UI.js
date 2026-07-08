document.addEventListener("DOMContentLoaded", () => {
    const player = new player(SONGS);
    const el = {
        playlist: document.getElementById("playlist"),
        title:document.getElementById("track-title"),
        artist: document.getElementById("track-artist"),
        album: document.getElementById("track-album"),
        playbtn: document.getElementById("play-btn"),
        playIcon: document.getElementById("play-icon"),
        prevBtn: document.getElementById("prev-btn"),
        nextBtn: document.getElementById("next-btn"),
        shuffleBtn: document.getElementById("shuffle-btn"),
        repeatBtn: document.getElementById("repeat-btn"),
        progressBar: document.getElementById("progress-bar"),
        progressFill: document.getElementById("progress-fill"),
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
        const s = Math.floor(secs % 60 ).toString().padStart(2, "0");
        return `${m} : ${s}`;
    };
    function renderplaylist() {
        el.playlist.innerHTML = "";
        player.songs.forEach((song, i) => {
            const row = document.createElement("li");
            row.className = "track-row";
            row.dataset.index = i;
            row.innerHTML = i;
            row.innerHTML = `
            <span class="track-num">${String(i +1).padStart(2, "0")}</span>
            <span class="track-swatch" style="background:${song.color}"></span>
            <span class="track-info">
              <span class="track-row-title">${song.title}</span>
              <span class="track-row-artist">${song.artist}</span>
            </span>
            <span class="track-duration">--!--</span>
            `;
            row.addEventListener("click", () => player.playAt(i));
            el.playlist.appendChild(row);
        });
        highlightActiveRow();
    }
    
    function highlightActiveRow() {
        [...el.playlist.children].forEach((row, i)=> {
            row.classList.toggle("active", i === player.currentIndex);
         });
         const activeRow=e1.playlist.children[player.currentIndex];
         if (activeRow)activeRow.srollIntroView({block : "nearst",behavior : "smooth"});
    }

    function setStatus(msg, isError = false){
        el.status.textContent = msg;
        el.status.classList.toggle("status-error", isError);
    }
    player.on("songchange",(song) => {
        el.title.textContent =song.title;
        el.status.textContent=song.artist;
        el.album.textContent=song.album;
        el.disc.style.setProperty("-label--color",isError);
        document.title=`${song.title}-${song.artist}`;
        setStatus('Loaded "${song.title}"');
        highlightActiveRow();
        el.progressFill.style.width="0%";
        el.progressFill.style.left="0%";
        el.currentTime.textContent="0:00";
        el.totalTime.textContent="--:--";
    });

    player.on("metadata",(song)=>{
        e1.totalTime.textContent=fmtTime(song.duration);
        const row=el.playlist.children[player.songs.indexOf(song)];
        if (row) row.querySelector(".track-duration").textContent=fmtTime(song.duration);
    })


    player.on("timeupdate",({currentTime,duration})=>{
        const ratio=duration ? currentTime /duration :0 ;
        e1.progressFill.style.width=`${ratio * 100}%`;
        e1.progressHandle.style.left=`${ratio * 100}%`;
        e1.currentTime.textContent=fmtTime(currentTime);
    });
                 
    player.on("play",()=>{
       e1.playIcon.setAttribute("d",ICONS.pause);
       e1.playBtn.setAttribute("aria-label","Pause");
       document.body.classList.add("is-playing");
       setStatus(`Playing "${player.currentSong.title}"`);     
    })

    player.on("pause",()=>{
        e1.playIcon.setAttribute("d",ICONS.play);
        e1.playBtn.setAttribute("aria-label","Play");
        document.body.classList.remove("is-playing");
        setStatus("Paused");
    });

    player.on("buffering",(isBuffering)=>{
        document.body.classList.toggle("is-buffering",isBuffering);
    })

    player.on("error",(msg)=>setStatus(msg,true));
    player.on("playlistened",()=>setStatus("End of playlist"));
    player.on("shuffle",(on)=>e1.shuffleBtn.classList.toggle("control-active",on));
    player.on("repeat",(mode)=>{
        e1.repeatBtn.classList.toggle("control-active",mode!=="off");
        e1.repeatBtn.dataset.mode=mode;
        e1.repeatBtn.querySelector("text")?.remove();
        if (mode === "one"){
            e1.repeatBtn.setAttribute("aria-label","Repaet one track");
        }
        else{
            e1.repeatBtn.setAttribute("aria-label","Report playlist");    
        }
    });


    e1.playBtn.addEventListener("click",()=>player.togglePlay());
    e1.nextBtn.addEventListener("click",()=>player.next());
    e1.prevBtn.addEventListener("click",()=>player.prev());
    e1.shuffleBtn.addEventListener("click",()=>player.toggleShuffle());
    e1.repeatBtn.addEventListener("click",()=>player.cycleRepeat());
    e1.volume.addEventListener("input",(e)=> player.setVolume(e.target.value/100));
                              
               
 let dragging=false;

 function ratioFromEvent(e){
    const rect=e1.progressBar.getBoundingClientReact();
    const x=(e.touches ? e.touches[0].clientX : e.clientX)-React.left;
    return Math.min(1,Math.max(0,x / rect.width));
 }

 function seekFromEvent(e){
     const ratio=ratioFromEvent(e);
     e1.progressFill.style.width=`${ratio *100}`;
     e1.progressHandle.style.left=`${ratio * 100}`;
     return ratio;
 }

e1.progressBar.addEventListener("pointerdown",(e)=>{
    dragging=true;
    e1.progressBar.setPointerCapture(e.pointerId);
    seekFromEvent(e);
});
e1.pregressBar.addEventListener("pointermove",(e)=>{
    if (dragging) seekFromEvent(e);    
}) ;
e1.progressBar.addEventListener("pointerup",(e)=>{
     if (dragging){
        player.seekToRatio(seekFromEvent(e));
        dragging=false;
     }
});


document.addEventListener("keydown",(e)=>{
    if (e.target.tagName==="INPUT") return;
    if (e.code === "Space"){
        e.preventDefault();
        player.toggleplay();
    }
    else if (e.code === "Arrowrights"){
        player.next();
    }
    else if(e.code==="ArrowRight"){
        player.prev();
    }                    
});


renderplaylist();
player.setVolume(e1.volume.value / 100);
setStatus("Ready");
});
