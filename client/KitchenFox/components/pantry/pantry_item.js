import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Container, Content, List, Picker, Item, Icon, InputGroup, Input, ListItem, Text, Card, CardItem, Body, Left, Button } from 'native-base';
import { button } from '../../style/button';

class PantryItem extends React.Component {
  constructor(props) {
    super(props)

    const item = this.props.navigation.state.params.item;
    this.state = {
      name: Object.values(item)[0]['name'],
      quantity: Object.values(item)[0]['quantity'],
      units: Object.values(item)[0]['units']
    }
  }

  handleUpdate() {
    console.warn(JSON.stringify(this.state));
    const token = this.props.session.token;
    const item = this.props.navigation.state.params.item;
    const key = Object.keys(item)[0];
    console.warn(key);
    const inventory = {
      inventory: {}
    };
    inventory['inventory'][`${key}`] = Object.assign(this.state);
    console.warn(JSON.stringify(inventory));
    console.warn(token);
    this.props.sendItems(token, inventory);
  }

  handleDelete() {
    console.warn(this.state);
  }

  static navigationOptions = {
    title: 'Update Inventory',
  };

  render() {
    const item = this.props.navigation.state.params.item;
    const name = Object.values(item)[0]['name'];
    const qty = Object.values(item)[0]['quantity'];
    const units = Object.values(item)[0]['units'];
    return (
      <Container>
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>You have {name} {qty} {units}.</Text>
            </ListItem>
            <InputGroup borderType='underline' >
              <Icon name='ios-home' />
              <Text>Type new quantity : </Text>
              <Input
              onChangeText={(num) => {this.setState({quantity: num});}}
              placeholder={`${this.state.quantity}`}
              />
              <Text>{units}</Text>
            </InputGroup >
          </List>
          <Button
            style={button.sessionButton}
            onPress={() => this.handleUpdate()}
            >
            <Text>UPDATE</Text>
          </Button>
          <Button
            style={button.sessionButton}
            onPress={() => this.handleDelete()}
            >
            <Text>DELETE</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default PantryItem;

// const PantryCategoryItemCard = () => {
//   return (
//     <Card>
//       <CardItem>
//         <Left>
//           <Body>
//             <Text>Asparagus</Text>
//             <Text note>Running Low</Text>
//           </Body>
//         </Left>
//       </CardItem>
//     </Card>
//   );
// };

// <Picker
//   borderType='underline'
//   iosHeader='Select one'
//   mode='dropdown'
//   selectedValue={this.state.units}
//   onValueChange={this.onValueChange.bind(this)}
//   >
//   <Item label="each" value="each" />
//   <Item label="g" value="g" />
// </Picker>