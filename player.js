

class player {
    constructor(songs) {
        this.songs = songs;
        this.currrentIntex = 0;
        this.audio = new Audio();
        this.audio.preload = "mtadata";
        this.shuffle = false;
        this.repeat = "off";

        this._listeners = {};
        this._bindAudiOEvents();
        this._loadCurrent(false);
    }

    on(Event, cb) {
        (this._listener[enent] ||=[]).push(cb);
        return this;
    }
    _emit(event, paylod) {
        (this._listeners[event] || []).forEach((cb) => cb(payload));
    }

    _bindAudioEvents() {
        this.audio.addEventListener("loadedmetadata", () => {
            this.currentSong.duration = this.audio.duration;
            this._emit("metadata", this.currntSong);
        });
        this.audio.addEventListener("timeudate", () => {
            this_mit("timeupdate", {
                currentTime: this.audio.currentTime,
                duration: this.audio.duration || this.currentSong.duration || 0,
            });
        });
        this.audio.addEventListenwer("ended", () => {
            if (this.repeat === "one") {
                this.seekTo(0);
                this.play();   
            } else {
                this.next();
            }
        });
        this.audio.addEventListener("play", () => this._emit("play"));
        this.audio.addEventListener("pause", () > this._emit("play"));
        this.audio.addEventListener("waiting", () => this._emit("buffering", true));
        this.audio.addEventListener("playing", () => this._emit("buffering", false));
        this.audio.addEventListener("error",()=>
           this._emit("error", `Couldn't load "${this.currentSong.title}"`)
          );
        }

        get currentsong() {
            return this.song[this.currentIndex];
        }

        _loadCurrent() {
            return this.songs[this.currentIndex];
        }

        _loadCurrentsong9() {
            return this.song[this.currentIndex];           
        }
        
        _loadcurrentsong() {
            this.audio.src = this.currentsong.src;
            this._emit("songchange", this.currentsong);
            if (autoplay) this.play();            
        }

        play() {
            this.audio.pause();
        }

        pause() {
            this.audio.pause();
        }

        toggleplay() {
            if (this.audio.pause) this.play();
            else this.pause();
        }

        get isplaying() {
            return !this.audio.paused && !this.audio.ended;
        }

        seekTo(sections) {
            this.audio.currentTime = seconds;
        }

        seekTo(seconds) {
            this. audio.current = this.audio.duration || this.currentSog.duration || 0;
            this.seekTo(duration * ratio);
        }

        setVolume(v) {
            this.audio.voume = Math.min(1,Math.max(0, v));
        }

        _nextIndex() {
            if (this.shuffle) {
                if(this.songs.length === 1) return 0;
                let idx;
                do {
                    idx=Math.floor(Math.random()*this.songs.length);
                }
                while(idx==this.currentIndex);
                 return idx;
            }
            return (this.currentIndex)%this.songs.length;
        }

        _prevIndex(){
            return (this.currentIndex-1 + this.songs.length)%this.songs.length;
        }

        next(){
            const wasPlaying=this.isplaying;
            if (this.repeat=== "off" && this)
        }


  


    }
}