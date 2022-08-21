const FRONT_BLOCK_CONTENT_START = `<section class="sprint-settings-page">
<div class="sprint-settings-container wide">
<p class="sprint-settings-title">Sprint</p>
<p class="sprint-settings-description">Try to guess as many words as you can in 60 seconds</p>
</div>
<div class="sprint-settings-container">
<p class="sprint-settings-title-levels">Choose the level:</p>
<form name="form1" id="sprint-levels" class="sprint-settings-levels-btns">
<label>
  <input type="radio" name="sprint-level" value="0" class="level-btn"></input>
  <div class="level-circle">A1</div>
</label>
<label>
  <input type="radio" name="sprint-level" value="1" class="level-btn"></input>
  <div class="level-circle">A2</div>
</label>
<label>
  <input type="radio" name="sprint-level" value="2" class="level-btn"></input>
  <div class="level-circle">B1</div>
  </label>
  <label>
  <input type="radio" name="sprint-level" value="3" class="level-btn"></input>
  <div class="level-circle">B2</div>
  </label>
  <label>
  <input type="radio" name="sprint-level" value="4" class="level-btn"></input>
  <div class="level-circle">C1</div>
  </label>
  <label>
  <input type="radio" name="sprint-level" value="5" class="level-btn"></input>
  <div class="level-circle">C2</div>
  </label>
</form>
</div>
<button class="start-btn" id="start-sprint-btn">Start</button>
</section>`;

const FRONT_BLOCK_CONTENT_GAME = `<section class="sprint-game">
<div class="timer"> <span><ion-icon class="timer-icon" name="timer-outline"></ion-icon></span><span class="timer" id="sprint-timer">60</span></div>
<div class="scores"><div id="score-info" class="score-info">Points: x10</div><p class="score-text">Total score: </p><p id="score-count" class="score-count">0</p>
</div>
<div class="score-alert">
<ion-icon class="alert-right" name="checkmark-circle-outline"></ion-icon>
<ion-icon class="alert-wrong" name="close-circle-outline"></ion-icon>
</div> 
<div class="words-combinations"><div class="en-word" id="en-word">totally</div><div class="middle-word">is</div><div class="ru-word" id="ru-word">кошка</div></div>
<div class="answer-btns">
<button class="right-btn" id="sprint-right-btn">Yes</button>
<button class="wrong-btn" id="sprint-wrong-btn">No</button>
</div>
</section>`;

const FRONT_BLOCK_CONTENT_MODAL = `<section class="sprint-game-modal">
<div class="sprint-game-modal-content">
<div class="modal-upper-btns">
<button class="to-go-btn active" id="to-results-btn">Result</button>
<button class="to-go-btn" id="to-words-btn">See my words</button>
</div>
<div id="modal-main-content">
<div class="modal-results" id="modal-results">


<div class="card">

<p class="result-message" id="result-message">Great result. But you can do better!</p>
<p class="result-statistics"><span id="correct-count">11</span> words learned, <span id="incorrect-count">4</span> words on study</p>
  <div class="box"><div class="percent">
      <svg><circle cx="70" cy="70" r="70"></circle><circle id="percent-circle" cx="70" cy="70" r="70"></circle><svg>
          <div class="num">
            <p class="percentage"><span id="percentage-amount">90</span>%</p>
            <p class="learned-words">learned words</p>
          </div>
    </div>
        <p class="text">Your total score is</p><p class="total-score-text" id="total-score">340</p>
  </div>
</div>

</div> <!--modal-result-end -->

<div class="word-list-container" id="word-list-container"> </div>
</div>

<div class="modal-lower-btns">
<button class="module-lower-btn" id="restart-sprint-btn">Play again</button>
<button class="module-lower-btn" id="to-text-book-btn"><a href="#textbook" class="module-lower-btn-ref">Go to the textbook</a></button>
</div>

</div>
</section>`;

const KEYBOARD_INSTRUCTIONS = `<div id="keyboard-layout">
<div class="keyboard-row"><div class="keyboard-symbol">←</div>
<p class="keyboard-text">Select yes</p>
</div>
<div class="keyboard-row"><div class="keyboard-symbol">→</div>
<p class="keyboard-text">Select no</p>
</div>
<div class="keyboard-row"><div class="keyboard-symbol">ENTER</div>
<p class="keyboard-text">Start game</p>
</div>
</div>`;

const FRONT_BLOCK_CONTENT_WORDS = `<section class="sprint-game-modal">
<div class="sprint-game-modal-content">
  <div class="modal-upper-btns">
    <button class="to-go-btn">Result</button>
    <button class="to-go-btn" id="to-words-btn">See my words</button>
  </div>

  <div class="modal-results">
    <div class="word-list-container" id="word-list-container">
  </div>

  <div class="modal-lower-btns">
<button class="module-lower-btn" id="restart-btn">Play again</button>
<button class="module-lower-btn" id="to-text-book-btn"><a href="#textbook" class="module-lower-btn-ref">Go to the textbook</a></button>
</div>
</div>
</section>`;

const createWordItem = (en: string, ru: string) => `<div class="word-item">
<span class="word-item-sound" id="word-sound"><ion-icon name="volume-high-outline" class="word-item-player"></ion-icon></span>
<span class="word-item-text">${en} - ${ru}</span>
</div> `;

export {
  FRONT_BLOCK_CONTENT_START,
  FRONT_BLOCK_CONTENT_GAME,
  FRONT_BLOCK_CONTENT_MODAL,
  KEYBOARD_INSTRUCTIONS,
  FRONT_BLOCK_CONTENT_WORDS,
  createWordItem,
};
