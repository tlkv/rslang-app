import './frontView.scss';
import Component from '../_templates/component';
import Header from '../_templates/header/header';
import Footer from '../_templates/footer/footer';

class FrontView extends Component {
  SectionMainContent = `<section class="main-page">
      <div class="greetings-box"> 
        <h2 class="greetings">Hey! Do you want to learn English easily?</h2>
        <p>RS Lang - an application for learning English in an easy game form.  
          Soon you will be able to watch your favorite series in the original  
          without waiting for the voice acting! What are you waiting for? Let's go! 
        </p> 
      </div> 
      <img src="./assets/main-img.png" alt="main-img" class="main-img"></img> 
    </section>`;

  SectionMainWrapper = new Component('div', ['container']);

  SectionAdvatagesContent = `<section class="advantages">
      <div class="advantage">There are over 3,000 words in our textbook divided into six sections.
       There is also a "learned words" section, where you can add those that are already known.
       Is a word difficult to give? Add it to the "difficult words" section to repeat it more often!
      </div>
      <div class="advantage advantage-border">Check out the statistics section to track your progress every day and improve it!
       You will find detailed statistics on mini-games and the words you have learned!
      </div>
      <div class="advantage">Learn words in a fun way!
       Check out the games section where you'll find two exciting mini-games
       that will help you quickly memorize new words not only in written but also in audio format!
      </div>
    </section>`;

  SectionAdvatagesWrapper = new Component('div', ['container']);

  SectionInfoContent = '<section class="about-us"></section>';

  SectionInfoWrapper = new Component('div', ['container']);

  header: Header;

  SectionMain: Component;

  SectionAdvatages: Component;

  SectionInfo: Component;

  footer: Footer;

  constructor(root: HTMLElement) {
    super('div', ['front-view'], root);
    this.header = new Header(this.container);

    this.SectionMain = new Component('div', ['front-block', 'app-center-block'], this.container);
    this.SectionMain.container.append(this.SectionMainWrapper.container);
    this.SectionMainWrapper.container.innerHTML = this.SectionMainContent;
    this.SectionInfoContent = `<section class="about-us">
      <div class="about-us-box">
        <h2 class="our-team-title">Our team</h2>
        <div class="team-card-box">
          <div class="teammate">
            <div class="info-box">
              <a  href="https://github.com/kristykov" class="name">Kristina</a>
              <p class="contribution-description">Sprint Game
              </p>
              <p class="contribution-description">Audio Challenge Game
              </p>
              <p class="contribution-description">Visual Design
              </p>
              </div>
          </div>
          <div class="teammate">
            <div class="info-box">
              <a href="https://github.com/tlkv"class="name">Andrey</a>
              <p class="contribution-description">Textbook page
              </p>
              <p class="contribution-description">Collecting user statistics
              </p>
              <p class="contribution-description">Project Architecture
              </p>
              <p class="contribution-description">Mobile version
              </p>
            </div>  
          </div>
          <div class="teammate">
            <div class="info-box">
              <a href="https://github.com/AnastasiyaPoleshuk" class="name">Anastasiya</a>
              <p class="contribution-description">User authorisation
              </p>
              <p class="contribution-description">Statistics page
              </p>
              <p class="contribution-description">Front Page & Visual Design
              </p>
            </div>
          </div>
        </div>
      </div>
  </section>`;

    this.SectionAdvatages = new Component(
      'div',
      ['advantages-block', 'app-center-block'],
      this.SectionMainWrapper.container, // this.container,
    );
    this.SectionAdvatages.container.append(this.SectionAdvatagesWrapper.container);
    this.SectionAdvatagesWrapper.container.innerHTML = this.SectionAdvatagesContent;

    this.SectionInfo = new Component('div', ['info-block'], this.container);
    this.SectionMainWrapper.container.append(this.SectionInfoWrapper.container);
    this.SectionInfoWrapper.container.innerHTML = this.SectionInfoContent;

    this.footer = new Footer(this.container);
  }
}

export default FrontView;
