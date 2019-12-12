import React, { useState } from 'react';
import {Link,} from 'react-router-dom';
import { Form, FormInput } from 'semantic-ui-react';
import { CenterHeader } from './Stylized';
import axios from 'axios';

const DepartmentNew = ({addDepartment, history}) => {

	const [name, setName]= useState("Department Name")
	const onSubmit = (e) => {
		e.preventDefault();
		axios.post('/api/departments',{name: name})
			.then( res =>
				history.push('/departments')
			)
	}

	return(
		<>
			<CenterHeader as="h1">New Department</CenterHeader>
			<Form onSubmit={onSubmit}>
				<FormInput
					required
					value={name}
					name="name"
					onChange={(e)=>setName(e.target.value)}
				>
				</FormInput>
				<Form.Button color="green">Add</Form.Button>
			</Form>
		</>
	)
}

export default DepartmentNew;