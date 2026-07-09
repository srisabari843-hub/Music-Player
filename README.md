Music Player
    A Browser-based Music player styled like an old hi-fi turntable .Spinning vinyl,a Tinearm that lifts When you hit play, ap playlist, and a draggable progress bar.No frameWorks,no Build Step-just open it in a browser.

Project Structure
    I solit the Code across a Few Files Instead of Cramming everything into one, mostly so it's easier to find what you're looking for later.

Files And it's function
      index.html -> the page structure.
      style.css -> All the Visual design-Colors,Fonts,the vinyl spin animation.
      icons.js -> just the two SVG paths for the play/pause icon.
      songs.js -> Your playlist - track names,artist,audio links.
      player.js -> the actual playback logic - play,pause,skip,seek,repeat.
      ui.js -> Glues player.js to the page - updates what you see on screen.

  if your files ended up flat in one folder (no subfolders),that's fine - just make sure the  <script src="..."> paths in index.html match your actual file names exactly , including capitalization.Icons.js and icons.js are different files.

Running it
   There's no install step index.html directly in a browser,or better , serve the folder with something like VS Code's Live Server extension so the file paths resolve properly.

Adding your Own song
    open songs.js.Each track is an object shaped like this';
      {
        id:1,
        title:"Late Static",
        artist:"Coral Drift",
        album:"Room Tone",
        duration :0,
        color: "#C9A227",
        src: "https://examples.com/song.mp3"
      }

    Field notes:
            duration-leave it at 0,it fills itself in automatically once the audio loads.
            color-the color of that tracks's little vinyl label.
            src-link to the mp3,or a local path like audio/song1.mp3
     Add,remove,or edit entries in that array and the playlist updates itself-no other files needs to change.

     The demo tracks right now point at SoundHelix's Free mp3s,just so the players has something to play out of the box.Swap then them for your own whenver you're ready.

      
Controls 
    =>click any row in the playlist to jump straight to the track.
    => Space bar - play/pause.
    =>Click or drag the progress bar to scrub through a song.
    =>shuffle and repeat buttons sit at either end of the transport row-repeat cycles through off->repeat all->repeat one.


if something's not loading.
   =>Almost always a path or filename mismatch between index.html and what's actually on disk.
