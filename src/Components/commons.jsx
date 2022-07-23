import styled from "styled-components";

const AppTitle = styled.h1`
  font-size: clamp(3rem, 5vw, 4rem);
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
  padding: 1rem;
  color: white;
  border: none;
`;
const PageBtn = styled.button`
  background: var(--color-gd);
  border-radius: 12px;
  min-width: 200px;
  margin: 0 1em;
  font-family: var(--font-b);
  color: white;
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  padding: 0.75rem 1.25rem;
  border: 1.5px solid white;
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);

    //neon box
    color: #fff;
    border-radius: 12px;
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 1.1rem var(--color-imp),
      0 0 0.8rem var(--color-imp), 0 0 1.5rem var(--color-imp),
      inset 0 0 1.1rem var(--color-imp);
  }
`;
export { AppTitle, PageInput, PageTitle, PageForm, PageBtn };
