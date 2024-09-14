import styled from "styled-components";

const BannerArea = styled.section`
  padding-top: 210px;
  padding-bottom: 100px;
  position: relative;
  background-color: #f9ab55;

  .section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .tier-levels-container {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
  }
  .main-title {
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 30px;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .table-container {
    overflow-x: auto;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .tier-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }
  .tier-table th,
  .tier-table td {
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
  }
  .criteria-header {
    text-align: left;
    font-weight: bold;
    color: #333;
    background-color: #f9f9f9;
  }
  .tier-header {
    background-color: #f9f9f9;
    border-bottom: 3px solid;
  }
  .tier-image {
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .tier-name {
    display: block;
    font-weight: bold;
    margin-top: 5px;
  }
  .tier-range {
    display: block;
    font-size: 0.8em;
    color: #666;
  }
  .criterion-name {
    text-align: left;
    font-weight: 500;
    color: #555;
  }
  .criterion-check {
    font-size: 1.2em;
  }
  .checkmark {
    color: #4caf50;
  }
  .dash {
    color: #ccc;
  }
  @media (max-width: 768px) {
    .tier-table {
      font-size: 14px;
    }
  }
  .hero-content-container {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    background-color: #f5f5f5;
    color: #333;
  }
  .main-title {
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  .subtitle {
    text-align: center;
    font-size: 1.2em;
    margin-bottom: 40px;
    color: #34495e;
  }
  .section-title {
    font-size: 2em;
    margin-bottom: 20px;
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
  }
  .badges-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 40px;
  }
  .badge-card,
  .criteria-card,
  .info-card {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .badge-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .badge-icon {
    margin-right: 10px;
    color: #3498db;
  }
  .badge-name {
    font-size: 1.2em;
    font-weight: bold;
    color: #2c3e50;
  }
  .badge-content p {
    margin-bottom: 10px;
  }
  .ranking-criteria-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .criteria-card {
    text-align: center;
  }
  .criteria-icon {
    font-size: 2em;
    color: #3498db;
    margin-bottom: 10px;
  }
  .criteria-card h3 {
    margin-bottom: 10px;
    color: #2c3e50;
  }
  .example-box {
    background-color: #ecf0f1;
    border-left: 4px solid #3498db;
    padding: 15px;
    margin-top: 20px;
  }
  .timeline {
    position: relative;
    padding: 20px 0;
  }
  .timeline-item {
    padding-left: 40px;
    position: relative;
    margin-bottom: 20px;
  }
  .timeline-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 30px;
    height: 30px;
    background-color: #3498db;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .timeline-content {
    background-color: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .timeline-content h4 {
    margin-bottom: 10px;
    color: #2c3e50;
  }
  @media (max-width: 768px) {
    .badges-grid,
    .ranking-criteria-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default BannerArea;
