import React from 'react';
import { Form, Header, } from "semantic-ui-react";

class ItemForm extends React.Component {
  defaultValues = { item: {name:"",description:"",price:0.00}, updating: false};
  state = this.props.item ? {item: this.props.item, updating: true} : {...this.defaultValues, };

	componentDidUpdate(prevProps) {
		if(this.props !== prevProps)
			this.setState({item: this.props.item, updating: this.props.item !== undefined });
	}

  handleSubmit = (e) => {
		e.preventDefault();
		const item = {...this.state.item, department_id: this.props.id};
		if(this.state.updating) 
			this.props.updateItem(item)
		else if(this.props.addItem !== undefined)
			this.props.addItem(item);
		this.setState({ ...this.defaultValues, });
  }

  handleChange = (e) => {
		const { target: { name, value, } } = e;
		const item={...this.state.item, [name]: value};
    this.setState({ item: item });
  }

  render() {
		const { name, price, description,} = this.state.item ? this.state.item : {name:"",description:"",price:0.00};
		const updating = this.state.updating;
    return (
      <div>
				{updating ? 
					<Header as="h2">Update</Header> :
					<Header as="h2">New Item</Header>
				}
        <Form onSubmit={this.handleSubmit}>
            <Form.Input
              label="Name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              label="Description"
              name="description"
              placeholder="Description"
              value={description}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Price"
              name="price"
              placeholder="Price"
              type="money"
              value={price}
              onChange={this.handleChange}
            />
          <Form.Button color="blue">Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default ItemForm;