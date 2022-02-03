import './footer.scss';
import '../../../../assets/png/github.png';

export default function initFooter(root: HTMLElement) {
  root.insertAdjacentHTML(
    'beforeend',
    `<footer>
      <p class="year-of-creation">@2022</p>
      <div class="authors-box">
          <img src="/assets/png/github.png" alt="github" class="github-img">
          <a href="https://github.com/kristykov" class="author">Kristina</a>
          <a href="https://github.com/AnastasiyaPoleshuk" class="author">Anastasiya</a>
          <a href="https://github.com/tlkv" class="author">Andrey</a>
      </div>
      <a href="https://rs.school/js/">
          <img src="https://rs.school/images/rs_school_js.svg" alt="rs.school" class="rs-school">
      </a>
  </footer>`,
  );
}
