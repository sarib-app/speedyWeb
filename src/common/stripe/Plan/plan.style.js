import styled from "styled-components";

const PrimaryColor = "#084887"; // Dark blue for strong presence
const White = "#ffffff";
const AccentColor = "#f9ab55"; // Accent color for interactive elements

export const BannerArea = styled.section`
  box-sizing: border-box;
  font-family: "DM Sans", sans-serif;
  color: ${PrimaryColor}; // Consistent text color

  .category-container {
    position: relative;
    z-index: 10;
    max-width: 1300px;
    margin: 0 auto; // Centering the container
    padding: 2em 1em;
    background-color: ${White};
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); // Soft shadow for depth

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
    transition: transform 0.2s; // Smooth transform on interaction

    &:hover {
      transform: scale(1.1); // Slightly enlarge on hover
    }
  }

  .category-list {
    display: flex;
    flex-direction: column;
    margin-top: 1em;
  }

  .category {
    border-radius: 8px;
    padding: 1em;
    display: flex;
    background-color: #fff;
    transition: box-shadow 0.3s, transform 0.3s;
    border: 1px solid #eaeaea; // Light border for separation
    margin-bottom: 1em;

    &:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
      transform: translateY(-3px);
    }
  }

  .category-details {
    padding-left: 20px;
  }

  // Other responsive and aesthetic tweaks as needed...
`;
export const StyledButton = styled.button`
  background-color: ${PrimaryColor}; // Using the PrimaryColor variable
  color: ${White}; // Using the White variable
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #063970; // Darker blue on hover
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
