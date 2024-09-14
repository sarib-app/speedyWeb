import styled from "styled-components";

const PrimaryColor = "#084887";
const White = "#ffffff";
const AccentColor = "#f9ab55";

const BannerArea = styled.section`
  box-sizing: border-box;
  font-family: "DM Sans", sans-serif;
  color: ${PrimaryColor};

  .category-container {
    position: relative;
    z-index: 10;
    max-width: 1300px;
    margin: 0 auto;
    padding: 2em 1em;
    background-color: ${White};
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 1024px) {
      padding: 2em;
    }
  }

  .category-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;
  }

  .category-icon {
    color: ${AccentColor};
    cursor: pointer;
    width: 25px;
    height: 25px;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }

  .category-table {
    margin-top: 1em;
  }

  .category-table-header {
    display: flex;
    background-color: ${PrimaryColor};
    color: ${White};
    padding: 1em;
    border-radius: 8px;
    font-weight: bold;
  }

  .category-header-cell {
    flex: 1;
    text-align: left;
    padding: 0.5em;
  }

  .category-list {
    display: flex;
    flex-direction: column;
    margin-top: 1em;
  }

  .category-row {
    display: flex;
    align-items: center;
    padding: 1em;
    background-color: ${White};
    border: 1px solid #eaeaea;
    border-radius: 8px;
    margin-bottom: 1em;
    transition: box-shadow 0.3s, transform 0.3s;

    &:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
      transform: translateY(-3px);
    }

    &:nth-child(even) {
      background-color: ${PrimaryColor};
      color: ${White};
    }
  }
  .toggle-text {
    color: blue;
    font-weight: bold;
    cursor: pointer;
    margin-left: 5px;
  }

  .toggle-text:hover {
    text-decoration: underline;
  }
  .category-cell {
    flex: 1;
    text-align: left;
    padding: 0.5em;
  }

  .error-message {
    color: red;
    margin-bottom: 1em;
  }

  .success-message {
    color: green;
    margin-bottom: 1em;
  }
`;

export default BannerArea;
