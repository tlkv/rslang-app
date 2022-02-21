import './frontView.scss';
import Component from '../_templates/component';
import Header from '../_templates/header/header';
import Footer from '../_templates/footer/footer';

class FrontView extends Component {
  SectionMainContent = `<section class="main-page">
      <div class="greetings-box"> 
        <h2 class="greetings">Hey! Do you want to learn English easily? You to us!</h2>
        <p>RS Lang - an application for learning English in an easy game form.  
          Soon you will be able to watch your favorite series in the original  
          without waiting for the voice acting! What are you waiting for? Let's go! 
        </p> 
        <button class="learn-more">Learn more</button> 
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

  SectionInfoContent = `<section class="about-us">
      <div class="about-us-box">
        <h2 class="our-team-title">Our team</h2>
        <div class="team-card-box">
          <div class="teammate">
            <img src="./assets/kristina.jpg" alt="kristina" class="teammate-img" >
            <div class="info-box">
              <a  href="https://github.com/kristykov" class="name">Kristina</a>
              <span class="position">designer | developer</span>
              <p class="contribution-description">Helped develop the structure of the project.
               She had a hand in creating authorization. All games are her fine work!
               The design has been improved many times.
              </p>
              </div>
          </div>
          <div class="teammate">
            <img src="./assets/andrey.jpg" alt="andrey" class="teammate-img">
            <div class="info-box">
              <a href="https://github.com/tlkv"class="name">Andrey</a>
              <span class="position">developer</span>
              <p class="contribution-description">Link of our team. Selflessly fought all git conflicts.
               Project setup and structure, back-end, as well as routing,
               tutorial and statistics collection - these are all his merits.
              </p>
            </div>  
          </div>
          <div class="teammate">
            <img src="./assets/anastasiya.jpg" alt="anastasiya" class="teammate-img">
            <div class="info-box">
              <a href="https://github.com/AnastasiyaPoleshuk" class="name">Anastasiya</a>
              <span class="position">designer | developer</span>
              <p class="contribution-description">Long and hard was engaged in layout.
               Made authorization and statistics page.
              </p>
            </div>
          </div>
        </div>
      </div>
  </section>`;

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

    this.SectionAdvatages = new Component(
      'div',
      ['advantages-block', 'app-center-block'],
      this.container,
    );
    this.SectionAdvatages.container.append(this.SectionAdvatagesWrapper.container);
    this.SectionAdvatagesWrapper.container.innerHTML = this.SectionAdvatagesContent;

    this.SectionInfo = new Component('div', ['info-block'], this.container);
    this.SectionInfo.container.append(this.SectionInfoWrapper.container);
    this.SectionInfoWrapper.container.innerHTML = this.SectionInfoContent;

    this.footer = new Footer(this.container);
  }
}

export default FrontView;
