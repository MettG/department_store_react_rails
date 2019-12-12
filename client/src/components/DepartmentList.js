import React from 'react';
import {Grid, Label, Header, GridColumn, Input, Divider, Button} from 'semantic-ui-react';
import styled from 'styled-components';
import { Link, } from 'react-router-dom';
import axios from 'axios';

class DepartmentList extends React.Component {

	state= {departments: [], editing: []}

	componentDidMount() {
    axios.get("/api/departments")
      .then( res => {
        this.setState({ departments: res.data, });
      })
	}
	
	handleChange = (e) => {
		const { target: { value, name} } = e;
		this.setState({departments: this.state.departments.map( dept => {
			if(dept.id === parseInt(name))
				return {...dept, name: value};
			return dept;
		})})
	}

	updateDepartment= (id) => {
		const department = this.state.departments.find(d => { if (d.id === id) return d});
		axios.put(`api/departments/${id}`, department)
			.then()
	}

	toggleEdit= (id) =>{
		var addingId = false;
		this.setState({editing: this.state.editing.filter( e => {
			if(e !== id) return e;
			addingId = true;
			this.updateDepartment(id);
			return null;
		})});
		if(!addingId || this.state.editing.length < 1)
			this.setState({editing: [...this.state.editing, id]});
	}

	render(){
		return(
			<>
				<CenterHeader as='h1'>Departments</CenterHeader>
				<Divider hidden></Divider>
				<Divider></Divider>
				<Grid columns={5} divided>
					{this.state.departments.map( department => (
						<StyledColumn key={department.id}>
							<EqualContainer>
								{this.state.editing.includes(department.id) ? 
									<Input
									name={department.id}
									placeholder="Name"
									value={department.name}
									onChange={this.handleChange}
									required
									></Input>
									:
									<Header>{department.name}</Header>
								}
								<br/>
								<LinkButton>
									<Link to={`/departments/${department.id}`}>
										<Label>
											View
										</Label>
									</Link>
								</LinkButton>
								<LinkButton>
									<Link onClick={()=> this.toggleEdit(department.id)}>
										<Label>
											Edit
										</Label>
									</Link>
								</LinkButton>
							</EqualContainer>
						</StyledColumn>
					))}
				</Grid>
				<Divider></Divider>
				<LinkButton>
					<Link to="'/departments/new">
						<Label>
							+
						</Label>
					</Link>
				</LinkButton>
			</>
		)
	}
}

const StyledColumn = styled(GridColumn)`
	width:100%;
	white-space: pre;
	overflow: hidden;
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

export default DepartmentList;