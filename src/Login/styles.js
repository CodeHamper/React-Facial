import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const CaixaCentro = styled.div`
  max-width: 380px;
  width: 94%;
  margin-left: 3%;
  margin-right: 3%;
  background: #fff;
  margin-top: 8%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2%;

  & h3 {
    font-weight: 400;
    font-size: 1.75em;
    margin-bottom: 0.5rem;
    color: #343a40;
  }

  & p {
    font-weight: 300;
    color: #6c7686 !important;
    margin-bottom: 5%;
  }

  & a {
    color: #03a9f4;
  }
`;

export const FormLabel = styled.label`
  font-size: 0.775rem;
  font-weight: 400;
  color: #343a40;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

export const FormInputPre = styled.div`
  margin-right: -0.0625rem;
  display: flex;

  & span {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.7;
    display: flex;
    background: #fff;
    margin-bottom: 0;
    padding: 0.625rem 1.1rem;
    text-align: center;
    white-space: nowrap;
    color: #adb5bd;
    border: 0.0625rem solid #ced4da;
    border-radius: 0.25rem 0.25rem 0 0;

    align-items: center;
  }
`;

export const FormInput = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: stretch;

  & input {
    font-size: 1rem;
    line-height: 1.7;
    display: block;

    height: calc(2.95rem + 0.125rem);
    padding: 0.625rem 1.1rem;
    transition: all 0.2s ease-in-out;
    color: #495057;
    border: 0.0625rem solid #ced4da;
    border-radius: 0 0 0.25rem 0.25rem;
    border-left: 0px;
    background-color: #fff;
    background-clip: padding-box;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

    &:focus {
      border-right: 5px solid #512da8;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 20px rgba(81, 15, 168, 0.1);
    }
  }
`;

export const BotaoEntrar = styled.button`
  position: relative;
  display: block;
  width: 100%;
  color: #fff;
  border-color: #24b7fa;
  background-color: #24b7fa;
  box-shadow: none;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.7;
  padding: 0.625rem 1.6rem;

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  border: 0.0625rem solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;

  &:disabled {
    cursor: none;
    background: #eee;
    color: #444;
  }
`;
