import "tailwindcss/tailwind.css";
import MOTD_logo from "../img/motd_logo.svg";
import Discord from "../img/discord.svg";
import Twitter from "../img/twitter.svg";

function Footer() {
  return (
    <div class="flex font-ssp bg-motdoffwhite text-motdblack">
      <img class="m-6" src={MOTD_logo} alt="Meme of the Day Logo"></img>
      <div class="flex-column m-6">
        <p class="font-anton">MEMES FEED</p>
        <ul>
          <li>
            <a href="">Sign in/up</a>
          </li>
          <li>
            <a href="">Upload Memes</a>
          </li>
        </ul>
      </div>
      <div class="flex-column m-6">
        <p class="font-anton">MY MEMES</p>
        <ul>
          <li>
            <a href="">My Memes</a>
          </li>
          <li>
            <a href="">Voter Payout History</a>
          </li>
          <li>
            <a href="">Account Settings</a>
          </li>
        </ul>
      </div>
      <div class="flex-column m-6">
        <p class="font-anton">HOW DOES IT WORK?</p>
        <ul>
          <li>
            <a href="">Mission Statement</a>
          </li>
          <li>
            <a href="">Rewards System</a>
          </li>
          <li>
            <a href="">Help Center</a>
          </li>
        </ul>
      </div>
      <div class="flex m-6">
        <a href="https://twitter.com/">
          <img src={Twitter} alt="Twitter Logo"></img>
        </a>
        <a href="https://discord.com/">
          <img src={Discord} alt="Dicsord Logo"></img>
        </a>
      </div>
    </div>
  );
}

export default Footer;
