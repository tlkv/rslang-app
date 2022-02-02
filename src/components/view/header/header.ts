import './header.scss';

export default function initHeader(root: HTMLElement) {
  root.insertAdjacentHTML(
    'beforeend',
    `<header class="header"> 
      <nav class="navigation"> 
        <div class="title"> 
          <img src="/assets/png/icon.png" alt="icon" class="icon" /> 
          <h1 class="h1">RS-Lang</h1> 
        </div>
        <ul class="menu-box"> 
          <li class="menu-item">textbook</li> 
          <li class="menu-item">mini-games</li> 
          <li class="menu-item">statistics</li> 
        </ul>
        <div class="log-in">Log in</div> 
      </nav> 
    </header>`,
  );
}
