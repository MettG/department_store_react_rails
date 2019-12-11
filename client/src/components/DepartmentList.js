import React from 'react';
import {Grid, Label, Header, GridColumn} from 'semantic-ui-react';
import { Link, } from 'react-router-dom';
import axios from 'axios';

class DepartmentList extends React.Component {

	state= {departments: []}

	componentDidMount() {
    axios.get("/api/departments")
      .then( res => {
        this.setState({ departments: res.data, });
      })
  }

	render(){
		return(
			<>
				<Header>Departments</Header>
				<Grid columns={5} divided>
					{this.state.departments.map( department => (
						<GridColumn key={department.id}>
							<Header>{department.name}</Header>
							<Link to={`/departments/${department.id}`}>
								<Label>
									View
								</Label>
							</Link>
						</GridColumn>
					))}
				</Grid>
			</>
		)
	}
}

export default DepartmentList;