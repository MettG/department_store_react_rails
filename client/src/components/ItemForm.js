import React from 'react';
import { Form, Header, } from "semantic-ui-react";

class ItemForm extends React.Component {
  defaultValues = { name: "", price: "", description: "", department_id: null, };
  state = this.props.item ? {item: this.props.item, updating: true} : {...this.defaultValues, };

	componentDidUpdate(prevProps) {
		if(this.props !== prevProps)
			this.setState({...this.props});
	}

  handleSubmit = (e) => {
    e.preventDefault();
		const item = {...this.state.item, department_id: this.props.id};
		if(this.props.updating) 
			this.props.updateItem(item)
		else if(this.props.addItem)
			this.props.addItem(item);
    this.setState({ ...this.defaultValues, });
  }

  handleChange = (e) => {
    const { target: { name, value, } } = e;
    this.setState({ [name]: value, });
  }

  render() {
    const { name, price, description, updating, } = this.state.item;
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