import styled from "styled-components";

const AppTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem);
  letter-spacing: 1.5px;
`;
const PageForm = styled.form`
  width: 100%;
  margin-top: 2rem;
  display: grid;
  place-items: center;
  gap: 1.5rem;
`;

const PageTitle = styled.h2`
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  font-family: var(--font-rg);
  opacity: 0.7;
  width: 100%;
  max-width: 730px;
  text-align: center;
`;
const PageInput = styled.input`
  width: 100%;
  max-width: 730px;
  font-family: var(--font-m);
  font-size: clamp(1rem, 2vw, 1.25rem);
  background: rgba(176, 176, 176, 0.3);
  border-radius: 8px;
  padding: clamp(1.1rem, 3vw, 1.35rem);
  color: white;
  border: none;
`;
const PageBtn = styled.button`
  background: linear-gradient(91.97deg, #955d94 4.03%, #d8a2c5 117.29%);
  border-radius: 12px;
  width: 200px;
  margin: 0 1em;
  font-family: var(--font-b);
  color: white;
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  padding: 0.75rem;
  min-width: fit-content;
  border: none;
  transition: all .5s ease;
  cursor: pointer;

  &:hover {
    background: var(--color-gd);
    transform: scale(1.02);
  }
`;
export { AppTitle, PageInput, PageTitle, PageForm, PageBtn };
