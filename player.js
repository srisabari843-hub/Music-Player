

class player {
    constructor(songs) {
        this.songs = songs;
        this.currentIndex = 0;
        this.audio = new Audio();
        this.audio.preload = "metadata";
        this.shuffle = false;
        this.repeat = "off";

        this._listeners = {};
        this._bindAudioEvents();
        this._loadCurrent(false);
    }

    on(event, cb) {
        (this._listeners[event] ||=[]).push(cb);
        return this;   
    }

    _emit(event, payload) {
        (this._listeners[event] || []).forEach((cb) => cb(payload));
    }      

    _bindAudioEvents() {
        this.audio.addEventListener("loadedmetadata", () => {
            this.currentSong.duration = this.audio.duration;
            this._emit("metadata", this.currentSong);
        });
        this.audio.addEventListener("timeupdate", () => {
            this._emit("timeupdate", {
                currentTime: this.audio.currentTime,
                duration: this.audio.duration || this.currentSong.duration || 0,
            });
        });

        this.audio.addEventListener("ended", () => {
            if (this.repeat === "one") {
                this.seekTo(0);
                this.play();     
            } else {
                this.next();
            }
        });
        this.audio.addEventListener("play", () => this._emit("play"));
        this.audio.addEventListener("pause", () => this._emit("pause"));
        this.audio.addEventListener("waiting", () => this._emit("buffering", true));
        this.audio.addEventListener("playing", () => this._emit("buffering", false));
        this.audio.addEventListener("error",()=>
           this._emit("error", `Couldn't load "${this.currentSong.title}"`)
          );
        }

        get currentSong() {
            return this.songs[this.currentIndex];
        }

        
        _loadCurrent(autoplay){
            this.audio.src = this.currentSong.src;
            this._emit("songchange", this.currentSong);
            if (autoplay) this.play();            
        }
 

        play() {
            this.audio.play().catch(()=>this._emit("error","Playback was blocked"));
        }

        pause() {
            this.audio.pause();
        }

        togglePlay() {
            if (this.audio.paused) this.play();
            else this.pause();
        }

        get isPlaying() {
            return !this.audio.paused && !this.audio.ended;
        }

        seekTo(seconds) {
            this.audio.currentTime = seconds;
        }

        seekToRatio(ratio) {
             const duration = this.audio.duration || this.currentSong.duration || 0;
            this.seekTo(duration * ratio);
        }

        setVolume(v) {
            this.audio.volume = Math.min(1,Math.max(0, v));
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
            return (this.currentIndex+1) % this.songs.length;
        }

        _prevIndex(){
            return (this.currentIndex-1 + this.songs.length)%this.songs.length;
        }

        next(){
            const wasPlaying=this.isPlaying;
            if (this.repeat=== "off" && this.currentIndex===this.songs.length-1 && !this.shuffle){
                this.pause();
                this.seekTo(0);
                this._emit("playlistend");
                return;
            }
            this.currentIndex=this._nextIndex();
            this._loadCurrent(wasPlaying);
        }

        prev(){
            if (this.audio.currentTime > 3){
                this.seekTo(0);
                return;
            }
            const wasPlaying=this.isPlaying;
            this.currentIndex=this._prevIndex();
            this._loadCurrent(wasPlaying);
        }
       
         playAt(index){
            if (index < 0 || index>=this.songs.length) return;
            this.currentIndex=index;
            this._loadCurrent(true);
         }  

         toggleShuffle(){
            this.shuffle=!this.shuffle;
            this._emit("shuffle",this.shuffle);
            return this.shuffle;
         }
          

         cycleRepeat(){
            this.repeat={off: "all",all:"one",one:"off"}[this.repeat];
            this._emit("repeat",this.repeat);
            return this.repeat;
         }
}