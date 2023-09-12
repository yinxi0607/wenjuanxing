import {FC} from 'react';
import styled, {css} from "styled-components";

type ButtonPropsType = {
    primary?: boolean
}

const Button = styled.button`
    background-color: #1890ff;
  ${(props:ButtonPropsType) => {
    return props.primary && css`
      background: palegoldenrod;
      color: white;
    `;
  }}
`

const Container = styled.div`
    text-align: center;
`

const StyledComponentsDemo: FC = () => {
    
    return (
        <div>
            <p>styled-components demo</p>
            <Container>
                <Button>Normal 按钮</Button>
                <Button primary>Primary 按钮</Button>
            </Container>
        </div>
    );
};

export default StyledComponentsDemo;