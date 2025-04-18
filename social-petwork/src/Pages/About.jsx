import React from "react";
import "../App.css";
import "../AboutPage.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="page-content">
        <h2>About Us</h2>
        <p>
          Welcome to The Social Petwork! We're a passionate group of developers and animal lovers
          who built this platform to connect pet lovers with other pet lovers!
        </p>
        <h2>Meet The Team!</h2>
      </div>

      <div className="team-section">
        {/* Angela */}
        <div className="team-member">
          <img src={require("../Assets/Images/angela.jpg")} alt="Angela Smith" className="team-img" />
          <h3>Angela Smith</h3>
          <p>Angela is a passionate full-stack developer with a love for pets, technology, and building inclusive digital spaces. She’s happiest when surrounded by her big cuddly Rottweiler, 3 crazy cats, and loving husband.</p>
          <div className="links">
            <a href="https://github.com/Ang3la33" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/angela-smith-4aa354278/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        {/* Anhelina */}
        <div className="team-member">
          <img src={require("../Assets/Images/anhelina.jpg")} alt="Anhelina Romanchuk" className="team-img" />
          <h3>Anhelina Romanchuk</h3>
          <p>Anhelina is a front-end developer, digital artist-in-training, and proud hamster wrangler. 🎨💻 Always chasing new ideas, tiny adventures, and just a little bit of chaos. ✨ Soon-to-be Software Development grad and building her own creative style.</p>
          <div className="links">
            <a href="https://github.com/angellisha" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/anhelina-romanchuk-24b9412a8/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        {/* Beth-Ann */}
        <div className="team-member">
          <img src={require("../Assets/Images/bethann.jpg")} alt="Beth-Ann Penney" className="team-img" />
          <h3>Beth-Ann Penney</h3>
          <p>
            🐾 Proud pet parent to 3 cats and 2 dogs. 🐱🐶<br />
            🐝 Beekeeper by day, painter by night 🎨<br />
            📚 Soon-to-be Software Development graduate.<br />
            ☕️ Coffee and tea enthusiast.<br />
            ❤️ Happily married to my favorite human.
          </p>
          <div className="links">
            <a href="https://github.com/B-Penney" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/bethann-penney" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        {/* Victoria */}
        <div className="team-member">
          <img src={require("../Assets/Images/victoria.jpg")} alt="Victoria Breen" className="team-img" />
          <h3>Victoria Breen</h3>
          <p>Victoria is a digital marketing expert and coding enthusiast, always with an iced coffee in hand. She’s rocking the ultimate auntie life with her pug, Deino, and her playful cat, Loki.</p>
          <div className="links">
            <a href="https://github.com/victoriaa-b" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/victoria-breen-b8888b26a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Pet Carousel */}
      <div className="pet-carousel">
        <h2>Our Furry Family 🐶🐱🐹</h2>
        <div className="carousel-loop">
          <div className="carousel-content">
            <img src={require("../Assets/Images/mac1.JPG")} alt="" />
            <img src={require("../Assets/Images/bethspuptree.jpeg")} alt="" />
            <img src={require("../Assets/Images/hammy(1).jpeg")} alt="" />
            <img src={require("../Assets/Images/pugalicious.jpg")} alt="" />
            <img src={require("../Assets/Images/mac3.JPG")} alt="" />
            <img src={require("../Assets/Images/ruin&lily.jpeg")} alt="" />
            <img src={require("../Assets/Images/obie.JPG")} alt="" />
            <img src={require("../Assets/Images/cutesthampster.jpeg")} alt="" />
            <img src={require("../Assets/Images/sleepypuppers.jpeg")} alt="" />
            <img src={require("../Assets/Images/snow.JPG")} alt="" />
            <img src={require("../Assets/Images/kitty1.jpeg")} alt="" />
            <img src={require("../Assets/Images/mac4.JPG")} alt="" />
            <img src={require("../Assets/Images/obie&pickles.JPG")} alt="" />
            <img src={require("../Assets/Images/sillykitty.jpeg")} alt="" />
            <img src={require("../Assets/Images/baby.jpeg")} alt="" />
            <img src={require("../Assets/Images/birthdayboymac.JPG")} alt="" />
            <img src={require("../Assets/Images/mac2.JPG")} alt="" />
            <img src={require("../Assets/Images/mac1.JPG")} alt="" />
            <img src={require("../Assets/Images/bethspuptree.jpeg")} alt="" />
            <img src={require("../Assets/Images/hammy(1).jpeg")} alt="" />
            <img src={require("../Assets/Images/pugalicious.jpg")} alt="" />
            <img src={require("../Assets/Images/mac3.JPG")} alt="" />
            <img src={require("../Assets/Images/ruin&lily.jpeg")} alt="" />
            <img src={require("../Assets/Images/obie.JPG")} alt="" />
            <img src={require("../Assets/Images/cutesthampster.jpeg")} alt="" />
            <img src={require("../Assets/Images/sleepypuppers.jpeg")} alt="" />
            <img src={require("../Assets/Images/snow.JPG")} alt="" />
            <img src={require("../Assets/Images/kitty1.jpeg")} alt="" />
            <img src={require("../Assets/Images/mac4.JPG")} alt="" />
            <img src={require("../Assets/Images/obie&pickles.JPG")} alt="" />
            <img src={require("../Assets/Images/sillykitty.jpeg")} alt="" />
            <img src={require("../Assets/Images/baby.jpeg")} alt="" />
            <img src={require("../Assets/Images/birthdayboymac.JPG")} alt="" />
            <img src={require("../Assets/Images/mac2.JPG")} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
