const FRONT_BLOCK_CONTENT_START = `<section class="sprint-settings-page">
<div class="sprint-settings-container wide">
<p class="sprint-settings-title">Аудиовызов</p>
<p class="sprint-settings-description">Тренировка Аудиовызов улучшает твое восприятие речи на слух.</p>
</div>
<div class="sprint-settings-container">
<p class="sprint-settings-title-levels">Выберите уровень:</p>
<form name="form1" id="sprint-levels" class="sprint-settings-levels-btns">
<label>
  <input type="radio" name="audio-level" value="0" class="level-btn"></input>
  <div class="level-circle">A1</div>
</label>
<label>
  <input type="radio" name="audio-level" value="1" class="level-btn"></input>
  <div class="level-circle">A2</div>
</label>
<label>
  <input type="radio" name="audio-level" value="2" class="level-btn"></input>
  <div class="level-circle">B1</div>
  </label>
  <label>
  <input type="radio" name="audio-level" value="3" class="level-btn"></input>
  <div class="level-circle">B2</div>
  </label>
  <label>
  <input type="radio" name="audio-level" value="4" class="level-btn"></input>
  <div class="level-circle">C1</div>
  </label>
  <label>
  <input type="radio" name="audio-level" value="5" class="level-btn"></input>
  <div class="level-circle">C2</div>
  </label>
</form>
</div>
<button class="start-audio-btn" id="start-audio-btn">Начать</button>
</section>`;

const FRONT_BLOCK_CONTENT_GAME = `<section class="audio-game">
<div class="audio-container">
<button class="audio-btn">
<ion-icon name="timer-outline"></ion-icon>
</button>
<img id="word-img"/>
<div id="main-word"></div>
<div class="audio-words">
<button class="audio-word-btn" ></button>
<button class="audio-word-btn" ></button>
<button class="audio-word-btn" ></button>
<button class="audio-word-btn" ></button>
<button class="audio-word-btn" ></button>
</div>
<button class="skip-btn"></button>
</div>
</section>`;

const FRONT_BLOCK_CONTENT_MODAL = `<section class="sprint-game-modal">
<div class="sprint-game-modal-content">
<div class="modal-upper-btns">
<button class="to-results-btn">результат</button>
<button class="to-see-words-btn">посмотреть мои слова</button>
</div>
<div class="modal-results">
<div class="card">
<p class="result-message">Хороший результат! Но ты можешь лучше</p>
<p class="result-statistics"><span id="correct-count">11</span> слов изучено, <span id="incorrect-count">4</span> слова на изучении</p>
  <div class="box"><div class="percent">
      <svg><circle cx="70" cy="70" r="70"></circle><circle id="percent-circle" cx="70" cy="70" r="70"></circle><svg>
          <div class="num">
            <p class="percentage"><span id="percentage-amount">90</span>%</p>
            <p class="learned-words">изученных слов</p>
          </div>
    </div>
        <p class="text"></p>
  </div>
</div>
</div>
<div class="modal-lower-btns">
<button class="module-lower-btn" id="restart-sprint-btn">сыграть еще раз</button>
<button class="module-lower-btn" id="to-text-book-btn"><a href="#textbook" class="module-lower-btn-ref">перейти в учебник</a></button>
</div>
</div>
</section>`;

export { FRONT_BLOCK_CONTENT_START, FRONT_BLOCK_CONTENT_GAME, FRONT_BLOCK_CONTENT_MODAL };
