import './main.scss';

export default function initMain(root: HTMLElement) {
  root.insertAdjacentHTML(
    'beforeend',
    `<main> 
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
    </main>`,
  );
}
