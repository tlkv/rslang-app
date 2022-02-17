import './statisticsView.scss';
import Component from '../_templates/component';
import Header from '../_templates/header/header';
import Footer from '../_templates/footer/footer';

class StatisticsView extends Component {
  frontBlockContent = `<section class="statistic-page">
      <h2 class="statistic-title">Daily statistic</h2>
      <div class="daily-statistic">
        <img src="./assets/statistic.png" alt="statistic" class="statistic-img">
        <div class="statistic-wrapp">
          <div class="game-statistic">
            <div class="statistic-card left">
              <h3 class="game-title left-title">Sprint game</h3>
              <p>
                <svg class="svgIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 
                    10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z">
                  </path>
                </svg>
                new words: <span class="count" id="sprint-new-words">0</span> 
              </p>
              <p>
                <svg class="svgIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                </svg>
                Correct answers: <span class="count" id="sprint-current-answers">0</span>%
              </p>
              <p>
                <svg class="svgIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                </svg>
                Longest series of correct answers: <span class="count" id="sprint-answer-chain">0</span>
              </p>
            </div>
            <div class="statistic-card right">
              <h3 class="game-title right-title">Audio game</h3>
              <p>
                <svg class="svgIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 
                    10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z">
                  </path>
                </svg>
                new words: <span class="count" id="audio-new-words">0</span> 
              </p>
              <p>
                <svg class="svgIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                </svg>
                Correct answers: <span class="count" id="audio-current-answers">0</span>%
              </p>
             <p>
              <svg class="svgIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
              </svg>
              Longest series of correct answers: <span class="count" id="audio-answer-chain">0</span>
            </p>
          </div>
        </div>
        <div class="general-statistics">
          <article class="general-learned-words">
            <h3 class="general-count" id="learned-words">0</h3>
            <h5>Learned words</h5>
          </article>
          <article class="general-learned-words">
            <h3 class="general-count" id="new-words">0</h3>
            <h5>New words</h5>
          </article>
          <article class="general-learned-words">
            <h3 class="general-count" id="correct-answers">0%</h3>
            <h5>Correct answers</h5>
          </article>
        </div>
      </div>
    </div>
  </section> `;

  frontBlockWrapper = new Component('div', ['container']);

  header: Header;

  frontBlock: Component;

  footer: Footer;

  constructor(root: HTMLElement) {
    super('div', ['statistics-view'], root);
    this.header = new Header(this.container);
    this.frontBlock = new Component(
      'div',
      ['statistics-block', 'app-center-block'],
      this.container,
    );
    this.footer = new Footer(this.container);
    this.frontBlock.container.append(this.frontBlockWrapper.container);
    this.frontBlockWrapper.container.innerHTML = this.frontBlockContent;
  }
}

export default StatisticsView;
