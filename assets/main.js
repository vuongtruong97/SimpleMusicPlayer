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

const app = {
  currentIndex: 0,
  isPlaying: false,
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
    cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      var scroll = window.scrollY || document.documentElement.scrollTop;
      var newCdWidth = cdWidth - scroll;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
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
    };
    // When song pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
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
      player.classList.remove("playing");
      _this.isPlaying = false;
      _this.currentIndex += 1;
      const playListLength = _this.songs.length;
      if (_this.currentIndex === playListLength - 1) {
        _this.currentIndex = 0;
      }
      _this.loadCurrentSong();
    };
    // When click Prev Btn
    prevBtn.onclick = function () {
      player.classList.remove("playing");
      _this.isPlaying = false;
      _this.currentIndex -= 1;
      const playListLength = _this.songs.length;
      if (_this.currentIndex < 0) {
        _this.currentIndex = playListLength - 1;
      }
      _this.loadCurrentSong();
    };
  },
  loadCurrentSong: function () {
    heading.innerText = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
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
    console.log(this.currentSong);
  },
};
app.start();
