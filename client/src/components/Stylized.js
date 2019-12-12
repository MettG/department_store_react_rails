import {Grid, Label, Header, GridColumn, Container} from 'semantic-ui-react';
import styled from 'styled-components';

const StyledColumn = styled(GridColumn)`
width:100%;
white-space: pre;
overflow: hidden;
`;

const JContainer = styled(Container)`
	background: white;
	font-size: 4em;
	color: white;
	transition: opacity 2.5s ease;
	transition: background 5s ease;
	opacity: 0.1;
	&:hover{
		transition: opacity 2.5s ease;
		transition: background 5s ease;
		background: green;
		opacity: 1;
	}
`;

const CenterHeader = styled(Header)`
text-align: center;
`;

const EqualContainer = styled.div`
display: flex-wrap;
align-items: center;
width:100%;
height:100%;
justify-items: center;
`;

const LinkButton = styled.div`
display: inline-flex;
margin: 5px;
padding: 1px 2px;
`;

export {
	StyledColumn,
	JContainer,
	CenterHeader,
	EqualContainer,
	LinkButton
}