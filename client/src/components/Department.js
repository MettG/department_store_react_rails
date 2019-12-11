import React from 'react';
import ItemList from './ItemList';
import { Divider, Header } from 'semantic-ui-react';
import axios from 'axios';
class Department extends React.Component {
	state = { department: {}, items: [] };

  componentDidMount() {
		const id = this.props.match.params.id;
    axios.get(`/api/departments/${id}`)
      .then( res => {
				this.setState({ department: res.data, });
			})
			.then(() => {
				axios.get(`/api/departments/${id}/items`).then(res => {
					this.setState({items: res.data});
				})
			})
  }

  render() {
		const { name, id} = this.state.department;
		const items = this.state.items;
    return (
      <div>
        <Header as="h1">{name}</Header>
				<Divider />
				<ItemList key={id} department_id={id} items={items} />
      </div>
		)
  }
}

export default Department;