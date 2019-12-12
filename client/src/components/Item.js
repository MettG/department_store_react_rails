import React, { Fragment } from 'react';
import {Card, CardContent, CardHeader, CardMeta, CardDescription, Button, } from 'semantic-ui-react';
import axios from 'axios';
import ItemForm from './ItemForm'

class Item extends React.Component {
	state={item: this.props.item, deleteItem: this.props.deleteItem, isForm : false}

	renderForm= () => {
		return (
			<CardHeader>
				<ItemForm item={this.state.item} id={this.props.id} updateItem={this.updateItem}/>
			</CardHeader>
		);
	}

	componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      this.setState({item: this.props.item, deleteItem: this.props.deleteItem,});
    }
  }

	updateItem = (item) => {
		const {department_id, id } = item
		axios.put(`/api/departments/${department_id}/items/${id}`, item)
			.then( res => {
				this.setState({...res.data, isForm: false})
				this.props.update(res.data);
			})
	}

	render() {
		const {name, description, price, id} = this.state.item
		return(
			<Card>
				<CardContent>
					{ this.state.isForm ? <> {this.renderForm()} </>: 
					<Fragment>
						<CardHeader>{name}</CardHeader>
						<CardMeta>${price}</CardMeta>
						<CardDescription>{description}</CardDescription>
					</Fragment>
					}
				</CardContent>
				<CardContent extra>
					<Button
						color="red"
						onClick={() => this.props.deleteItem(id)}
					>
						Delete</Button>
					<Button
						color="green"
						onClick={() => this.setState({isForm: !this.state.isForm})}
					>
						Edit</Button>
				</CardContent>
			</Card>
		)
	}
}

export default Item;

