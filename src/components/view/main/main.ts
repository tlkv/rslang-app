import './main.scss';
import '../../../../assets/png/main-img.png';
import '../../../../assets/png/anastasiya.jpg';

export default function initMain(root: HTMLElement) {
  root.insertAdjacentHTML(
    'beforeend',
    `<main class="main"> 
        <section class="main-page"> 
          <div class="greetings-box"> 
            <h2 class="greetings">Hey! Do you want to learn English easily? You to us!</h2>
            <p>RS Lang - an application for learning English in an easy game form.  
              Soon you will be able to watch your favorite series in the original  
              without waiting for the voice acting! What are you waiting for? Let's go! 
            </p> 
            <button class="learn-more">Learn more</button> 
          </div> 
          <img src="/assets/png/main-img.png" alt="main-img" class="main-img"></img> 
        </section>
        <section class="advantages">
          <div class="advantage">More than 3000 words, <br> divided into 6 sections.</div>
          <div class="advantage advantage-border">Daily statistics of learned words!<br> Improve it every day and reach new heights</div>
          <div class="advantage">Learning words in a playful way!<br> two mini-games for better word memorization</div>
        </section>
        <section class="about-us">
          <div class="about-us-box">
            <h2 class="our-team-title">Our team</h2>
            <div class="team-card-box">
              <div class="teammate">
                <img src="https://avatars.githubusercontent.com/u/42784731?v=4" alt="kristina" class="teammate-img" >
                <h2 class="name kristina">Kristina</h2>
                <h3 class="position">Position</h3>
                <p class="contribution-description">contribution-description</p>
              </div>
              <div class="teammate">
                <img src="https://avatars.githubusercontent.com/u/54753081?v=4" alt="andrey" class="teammate-img">
                <h2 class="name andrey">Andrey</h2>
                <h3 class="position">Position</h3>
                <p class="contribution-description">contribution-description</p>
              </div>
              <div class="teammate">
                <img src="/assets/png/anastasiya.jpg" alt="anastasiya" class="teammate-img">
                <h2 class="name">Anastasiya</h2>
                <h3 class="position">Position</h3>
                <p class="contribution-description">contribution-description</p>
              </div>
            </div>
          </div>
        </section>  
      </main>`,
  );
}
