import React from 'react';
import Item from './Item';
import ItemForm from './ItemForm';
import { CardGroup, Divider } from 'semantic-ui-react';
import axios from 'axios';

class ItemList extends React.Component {

	state = {department_id: this.props.id, items: this.props.items};

	componentDidUpdate(prevProps) {
    if(this.props.items !== prevProps.items) {
      this.setState({...this.props});
    }
	}

	addItem = (item) => {
		const {department_id} = this.state
		axios.post(`/api/departments/${department_id}/items`, item)
			.then(res => {
				this.setState({items: [...this.state.items, res.data]});
			})
	}

	update = (item) => {
		this.setState({items: this.state.items.map(i => {
			if(i.id === item.id) return item;
			return i;
		})})
	}

	deleteItem = (id) => {
		const {department_id, items} = this.state
		axios.delete(`/api/departments/${department_id}/items/${id}`)
			.then(res => {
				this.setState({items: items.filter(item => {
					if(item.id !== id) return item;
					return null;
				})});
			})
	}

	render() {
		return(
			<>
				<CardGroup>
					{
						this.state.items.map(item => {
							return(<Item key={item.id} id={this.state.department_id} item={item} deleteItem={this.deleteItem} update={this.update}/>)
						})
					}
				</CardGroup>
				<Divider hidden></Divider>
				<ItemForm id ={this.props.id} addItem={this.addItem}/>
			</>
		)
	}
}

export default ItemList;