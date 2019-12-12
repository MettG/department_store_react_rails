import React from 'react';
import {Grid, Label, Header, GridColumn, Input, Divider} from 'semantic-ui-react';
import {CenterHeader, EqualContainer, StyledColumn, LinkButton, JContainer} from './Stylized';
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
				<Divider hidden></Divider>
				<Grid columns={5}>
					{this.state.departments.map( department => (
						<>
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
						</>
					))}
				</Grid>
				<Divider hidden></Divider>
				<Link to="/departments/new">
					<JContainer textAlign="center" color="green">
						<p>
							+
						</p>
					</JContainer>
				</Link>
			
			</>
		)
	}
}

export default DepartmentList;