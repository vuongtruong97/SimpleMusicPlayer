//Render Songs
//Scroll
// play / pause / seek
//CD rotate
//Next, Prev
//Random
//Next, Repeat when end
//Active song
//Scroll active song into view
//Play song when click

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progressBar = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "Reality ",
      singer: "Lost Frequencies; Janieck Devy",
      path: "./assets/music/song1.mp3",
      image: "./assets/img/song1.jpg",
    },
    {
      name: " What Makes You Beautiful",
      singer: "One Direction",
      path: "./assets/music/song2.mp3",
      image: "./assets/img/song2.jpg",
    },
    {
      name: "Sugar",
      singer: "Maroon 5",
      path: "./assets/music/song3.mp3",
      image: "./assets/img/song3.png",
    },
    {
      name: "Hello",
      singer: "Adele",
      path: "./assets/music/song4.mp3",
      image: "./assets/img/song4.png",
    },
    {
      name: "Lemon Tree",
      singer: "Fools Garden",
      path: "./assets/music/song5.mp3",
      image: "./assets/img/song5.jpg",
    },
    {
      name: "Shape Of You",
      singer: "J.Fla",
      path: "./assets/music/song6.mp3",
      image: "./assets/img/song6.jpg",
    },
    {
      name: "Until You",
      singer: "Shayne Ward",
      path: "./assets/music/song7.mp3",
      image: "./assets/img/song7.jpg",
    },
    {
      name: "Love Me Like You Do",
      singer: "Ellie Goulding",
      path: "./assets/music/song8.mp3",
      image: "./assets/img/song8.png",
    },
    {
      name: "Girls Like You",
      singer: "Maroon 5 ft Cardi B",
      path: "./assets/music/song9.mp3",
      image: "./assets/img/song9.jpg",
    },
    {
      name: "Senorita",
      singer: "Shawn Mendes ft Camila Cabello",
      path: "./assets/music/song10.mp3",
      image: "./assets/img/song10.jpg",
    },
  ],
  render: function () {
    var playList = $(".playlist");
    var html = app.songs.map(function (song, index) {
      return `
          <div class="song">
          <div class="thumb" style="background-image: url('${song.image}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
          `;
    });
    playList.innerHTML = html.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    // Rotate the CD
    var cdRotate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: 10000000,
    });
    cdRotate.pause();

    // Scroll Web
    cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      var scroll = window.scrollY || document.documentElement.scrollTop;
      var newCdWidth = cdWidth - scroll;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    // Play Btn
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // When song play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdRotate.play();
    };
    // When song pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdRotate.pause();
    };
    // When song's time change
    audio.ontimeupdate = function () {
      const currentTime = audio.currentTime;
      const totalTime = audio.duration;
      currentPosition = (currentTime / totalTime) * 100;
      currentPosition = Math.floor(currentPosition);
      if (currentPosition) {
        progressBar.value = currentPosition;
      }
    };
    // When change value of progressBar
    progressBar.onchange = function (events) {
      currentValue = events.target.value;
      const seekTime = (audio.duration / 100) * currentValue;
      audio.currentTime = seekTime;
    };
    // When click next Btn
    nextBtn.onclick = function () {
      if (_this.isRepeat) {
        _this.repeatSong();
      } else {
        if (_this.isRandom) {
          _this.songRandomIndex();
        }
        _this.nextSong();
      }
      progressBar.value = 0;
      // cdRotate.finish();
      setTimeout(function () {
        audio.play();
      }, 700);
    };
    // When click Prev Btn
    prevBtn.onclick = function () {
      if (_this.isRepeat) {
        _this.repeatSong();
      } else {
        if (_this.isRandom) {
          _this.songRandomIndex();
        }
        _this.prevSong();
      }

      progressBar.value = 0;
      setTimeout(function () {
        audio.play();
      }, 700);
    };
    // when click randomBtn
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    // on/off repeat Btn
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };
    //When audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        _this.repeatSong();
      } else {
        if (_this.isRandom) {
          _this.songRandomIndex();
          _this.nextSong();
        }
      }
      progressBar.value = 0;
      setTimeout(function () {
        audio.play();
      }, 1000);
    };
  },
  loadCurrentSong: function () {
    heading.innerText = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  nextSong: function () {
    this.currentIndex++;
    const playListLength = this.songs.length;
    if (this.currentIndex >= playListLength) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  repeatSong: function () {
    this.currentIndex = this.currentIndex;
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    const playListLength = this.songs.length;
    if (this.currentIndex < 0) {
      this.currentIndex = playListLength - 1;
    }
    this.loadCurrentSong();
  },
  songRandomIndex: function () {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.songs.length);
    } while (randomIndex === this.currentIndex);
    this.currentIndex = randomIndex;
    this.loadCurrentSong();
  },

  start: function () {
    // Định nghĩa các thuộc tính cho Object
    this.defineProperties();

    // Lắng nghe và xử lý các sự kiện (DOM Events)
    this.handleEvents();
    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    // Render Playlist
    this.render();
  },
};
app.start();
