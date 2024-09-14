import React from "react";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import BannerArea from "./herocontentaboutus.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AceImage from "common/assets/image/webApp/Ace.png";
import RookieImage from "common/assets/image/webApp/Rookie.png";
import ProImage from "common/assets/image/webApp/Pro.png";
import TrailblazerImage from "common/assets/image/webApp/Trailblazer.png";
import EliteImage from "common/assets/image/webApp/Elite.png";
import ChampionImage from "common/assets/image/webApp/Champion.png";
import Image from "next/image";

import {
  faCheckCircle,
  faStar,
  faMedal,
  faTrophy,
  faCrown,
  faGem,
  faTags,
  faShieldAlt,
  faIdCard,
  faHeart,
  faHandsHelping,
  faClock,
  faThumbsUp,
  faThumbsDown,
  faSmile,
  faBolt,
  faSearch,
  faCommentDots,
  faHandshake,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

const criteria = [
  "Low Price",
  "Punctuality Award",
  "Top Rated",
  "Verified",
  "Insurance",
  "Certified Expert",
  "Customer Loyalty",
  "Community Contributor",
  "Minimum of 10 good services",
  "Minimum of 20 good services",
  "Minimum of 30 good services",
  "Minimum of 40 good services",
  "Minimum of 50 good services",
  "No more than 1 bad service",
  "No more than 2 bad services",
];

const tierLevels = [
  {
    name: "Trailblazer",
    image: TrailblazerImage,
    color: "#f9ab55",
    criteria: [
      "Low Price",
      "Punctuality Award",
      "Minimum of 10 good services",
      "No more than 1 bad service",
    ],
  },
  {
    name: "Rookie (50-74)",
    image: RookieImage,
    color: "#ff9800",
    criteria: [
      "Low Price",
      "Punctuality Award",
      "Top Rated",
      "Minimum of 20 good services",
      "No more than 2 bad services",
    ],
  },
  {
    name: "Ace (75-89)",
    image: AceImage,
    color: "#3f51b5",
    criteria: [
      "Top Rated",
      "Low Price",
      "Punctuality Award",
      "Verified",
      "Minimum of 30 good services",
      "No more than 2 bad services",
    ],
  },
  {
    name: "Pro (90-104)",
    image: ProImage,
    color: "#009688",
    criteria: [
      "Top Rated",
      "Low Price",
      "Punctuality Award",
      "Verified",
      "Insurance",
      "Minimum of 40 good services",
      "No more than 2 bad services",
    ],
  },
  {
    name: "Elite (105-119)",
    image: EliteImage,
    color: "#673ab7",
    criteria: [
      "Top Rated",
      "Low Price",
      "Punctuality Award",
      "Verified",
      "Insurance",
      "Certified Expert",
      "Minimum of 50 good services",
      "No more than 2 bad services",
    ],
  },
  {
    name: "Champion (120+)",
    image: ChampionImage,
    color: "#f44336",
    criteria: [
      "Top Rated",
      "Low Price",
      "Punctuality Award",
      "Verified",
      "Insurance",
      "Certified Expert",
      "Customer Loyalty",
      "Community Contributor",
      "Minimum of 50 good services",
      "No more than 1 bad service",
    ],
  },
];

const badgesData = {
  "Top Rated": {
    icon: faTrophy,
    description:
      "Consistently receive top ratings from customers for outstanding service.",
    howToEarn:
      "Achieve and maintain a high average rating from customer reviews over a specified period.",
    howToLose:
      "Receive consistently lower ratings or negative feedback from customers.",
  },
  Verified: {
    icon: faMedal,
    description:
      "Successfully pass a verification process for identity and credentials.",
    howToEarn:
      "Complete the platform's verification process, including identity checks and credential verification.",
    howToLose:
      "Provide false information, fail to update expired credentials, or violate platform policies.",
  },
  "Low Price": {
    icon: faTags,
    description:
      "Offer competitive pricing and excellent value for your services.",
    howToEarn:
      "Earn this badge by receiving 10 positive ratings for pricing and no more than 3 negative ratings for pricing.",
    howToLose: "Lose this badge if negative ratings for pricing exceed 3.",
  },
  Insurance: {
    icon: faShieldAlt,
    description: "Maintain proper insurance for liability and damages.",
    howToEarn:
      "Obtain and maintain valid insurance coverage relevant to your services.",
    howToLose:
      "Lose this badge if insurance policies are not renewed or are invalid.",
  },
  "Certified Expert": {
    icon: faIdCard,
    description: "Hold and maintain proper professional licensing.",
    howToEarn:
      "Acquire and keep up-to-date professional licenses required for your field of work.",
    howToLose:
      "Lose this badge if professional licenses expire or are invalid.",
  },
  "Customer Loyalty": {
    icon: faHeart,
    description:
      "Recognized for building a loyal customer base with repeat clients.",
    howToEarn:
      "Earn this badge by receiving repeat business from at least 10 different customers.",
    howToLose:
      "Lose this badge if there is a significant decline in customer retention.",
  },

  "Punctuality Award": {
    icon: faClock,
    description: "Consistently deliver services on time.",
    howToEarn:
      "Earn this badge by being on time for at least 10 services and receiving positive feedback for punctuality.",
    howToLose:
      "Lose this badge if there are more than 3 negative feedbacks for punctuality.",
  },
  "Customer Satisfaction": {
    icon: faSmile,
    description:
      "Recognized for delivering exceptional service that leaves customers highly satisfied.",
    howToEarn:
      "Maintain a customer satisfaction score of 95% or higher based on post-service feedback over a specified period.",
    howToLose:
      "Lose this badge if the customer satisfaction score drops below 85% for consecutive services.",
  },
  "Speedy Service": {
    icon: faBolt,
    description:
      "Awarded for consistently delivering services quickly without compromising quality.",
    howToEarn:
      "Complete at least 20 services with an average completion time 20% faster than the platform’s standard.",
    howToLose:
      "Lose this badge if the average completion time for services starts exceeding the platform's standard time.",
  },

  "Communication Pro": {
    icon: faCommentDots,
    description:
      "Recognized for excellent communication with customers, keeping them informed and at ease throughout the service.",
    howToEarn:
      "Earn this badge by receiving consistent praise for clear, timely, and effective communication in at least 20 customer reviews.",
    howToLose:
      "Lose this badge if there are significant delays in responding to customer inquiries or if communication-related complaints increase.",
  },
  "Commitment Keeper": {
    icon: faHandshake,
    description:
      "Recognized for consistently honoring commitments by not canceling confirmed jobs.",
    howToEarn:
      "Earn this badge by maintaining a 100% record of completing jobs once they are confirmed, over a specified period (e.g., 6 months).",
    howToLose:
      "Lose this badge if there are any cancellations after job confirmations.",
  },
  "Exclusive Discounts": {
    icon: faTag,
    description: "Unlocks access to exclusive deals for top-rated providers.",
    howToEarn: "Maintain a high rating (e.g., above 4.8) and meet milestones.",
    howToLose: "Lose this badge if performance drops or standards aren't met.",
  },
};
const allCriteria = Array.from(
  new Set(tierLevels.flatMap((tier) => tier.criteria))
);

const HeroContentAboutUs = () => {
  return (
    <BannerArea>
      <div className="hero-content-container">
        <h1 className="main-title">Achievement Program</h1>
        <p className="subtitle">How to earn badges and grow your business!</p>

        <section className="badges-section">
          <h2 className="section-title">Badges</h2>
          <div className="badges-grid">
            {Object.entries(badgesData).map(([name, badge], index) => (
              <div key={name} className="badge-card">
                <div className="badge-header">
                  <FontAwesomeIcon
                    icon={badge.icon}
                    size="2x"
                    className="badge-icon"
                  />
                  <span className="badge-name">{name}</span>
                </div>
                <div className="badge-content">
                  <p>
                    <strong>Description:</strong> {badge.description}
                  </p>
                  <p>
                    <strong>How To Earn:</strong> {badge.howToEarn}
                  </p>
                  <p>
                    <strong>How to Lose:</strong> {badge.howToLose}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="tier-levels-section">
          <h2 className="section-title">Tier Levels</h2>
          <div className="table-container">
            <table className="tier-table">
              <thead>
                <tr>
                  <th className="criteria-header">Criteria</th>
                  {tierLevels.map((tier) => (
                    <th
                      key={tier.name}
                      className="tier-header"
                      style={{ borderColor: tier.color }}
                    >
                      <Image
                        src={tier.image}
                        alt={tier.name}
                        width={60}
                        height={60}
                        className="tier-image"
                      />
                      <span className="tier-name" style={{ color: tier.color }}>
                        {tier.name}
                      </span>
                      {tier.range && (
                        <span className="tier-range">({tier.range})</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from(
                  new Set(tierLevels.flatMap((tier) => tier.criteria))
                ).map((criterion) => (
                  <tr key={criterion}>
                    <td className="criterion-name">{criterion}</td>
                    {tierLevels.map((tier) => (
                      <td key={tier.name} className="criterion-check">
                        {tier.criteria.includes(criterion) ? (
                          <span className="checkmark">✓</span>
                        ) : (
                          <span className="dash">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="ranking-criteria-section">
          <h2 className="section-title">Ranking Criteria</h2>
          <div className="ranking-criteria-grid">
            <div className="criteria-card">
              <FontAwesomeIcon icon={faThumbsUp} className="criteria-icon" />
              <h3>Total Positive Badges</h3>
              <p>More positive badges rank higher.</p>
            </div>
            <div className="criteria-card">
              <FontAwesomeIcon icon={faThumbsDown} className="criteria-icon" />
              <h3>Total Negative Badges</h3>
              <p>Fewer negative badges rank higher.</p>
            </div>
            <div className="criteria-card">
              <FontAwesomeIcon icon={faClock} className="criteria-icon" />
              <h3>Most Recent Positive Feedback</h3>
              <p>More recent feedback ranks higher.</p>
            </div>
            <div className="criteria-card">
              <FontAwesomeIcon icon={faCheckCircle} className="criteria-icon" />
              <h3>Number of Completed Services</h3>
              <p>More completed services rank higher.</p>
            </div>
          </div>
        </section>

        <section className="how-badges-affect-section">
          <h2 className="section-title">How Badges Affect Tier Levels</h2>
          <div className="info-card">
            <p>
              Service providers earn badges based on their performance. For
              example, if a provider receives 10 positive ratings and no more
              than 3 negative ratings, they earn the "Top Rated" badge. Badges
              contribute to the provider's composite score, which determines
              their tier level.
            </p>
            <p>
              <strong>Example:</strong> Provider A earns the "Top Rated" badge,
              contributing to their composite score. Over time, they accumulate
              20 positive ratings and minimal negative feedback, advancing to
              the "Rookie" tier.
            </p>
          </div>
        </section>

        <section className="re-earning-badges-section">
          <h2 className="section-title">Re-Earning Lost Badges</h2>
          <div className="info-card">
            <h3>Low Price Badge Example:</h3>
            <ol>
              <li>
                <strong>Initial Loss:</strong> Provider receives 6 negative
                ratings for high prices and loses the "Low Price" badge.
              </li>
              <li>
                <strong>Adjust Pricing:</strong> Provider reviews and adjusts
                their pricing to be more competitive.
              </li>
              <li>
                <strong>Customer Feedback:</strong> Provider actively seeks and
                monitors customer feedback, addressing pricing concerns
                promptly.
              </li>
              <li>
                <strong>Service Improvement:</strong> Provider improves overall
                service quality, encouraging positive reviews.
              </li>
              <li>
                <strong>Negative Badge Expiry:</strong> Older negative badges
                (older than 6 months) are removed from the provider's history.
              </li>
              <li>
                <strong>Earn Positive Feedback:</strong> Provider earns 10 new
                positive ratings for competitive pricing without more than 3 new
                negative ratings.
              </li>
              <li>
                <strong>Re-Earn Badge:</strong> Once the provider meets the
                criteria, they re-earn the "Low Price" badge.
              </li>
            </ol>
          </div>
        </section>
      </div>
    </BannerArea>
  );
};

export default HeroContentAboutUs;
