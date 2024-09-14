// eventoverlay.style.js
import styled from "styled-components";

export const ModalContent = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 100%;
    margin: auto;
    
    h2 {
        font-size: 24px;
        color: #333;
        margin-bottom: 20px;
    }
    
    label {
        display: block;
        margin-bottom: 15px;
        font-weight: bold;
        color: #555;
        
        input[type="text"], input[type="date"] {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            color: #333;
            margin-top: 5px;
            transition: border 0.2s;
            
            &:focus {
                border-color: #007BFF;
                outline: none;
            }
        }
    }

    button {
        padding: 10px 15px;
        border: none;
        background-color: #007BFF;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
        
        &:hover {
            background-color: #0056b3;
        }
        
        &:not(:last-child) {
            margin-right: 10px;
        }
    }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
`;
