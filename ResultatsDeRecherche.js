/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';

type Props = {};
const styles = StyleSheet.create({
  conteneurTexte: {
    flex: 1,
  },
  separateur: {
    height: 1,
    backgroundColor: '#eedded',
  },
  nomOfficiel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#58BEEC',
  },
  autre: {
    fontSize: 20,
    color: '#656565',
  },
  conteneurLigne: {
    flexDirection: 'row',
    padding: 10,
  },
});
export default class ResultatsDeRecherche extends Component<Props> {
  _extracteurClef = (item, index) => index.toString();

  _rendreItem = ({item, index}) => (
    <ListItem item={item} index={index} onPressItem={this._itemAppuye} />
  );

  render() {
    console.log(this.props.route.params);
    const {listings} = this.props.route.params;
    return (
      <FlatList
        data={listings}
        keyExtractor={this._extracteurClef}
        renderItem={this._rendreItem}
      />
    );
  }
}

class ListItem extends React.PureComponent {
  _itemAppuye = () => {
    console.log('Ligne appuyée : '+this.props.index);
  };
  render() {
    const item = this.props.item;
    return (
      <TouchableHighlight onPress={this._itemAppuye} underlayColor="#eedddd">
        <View>
          <View style={styles.conteneurLigne}>
            <View style={styles.conteneurTexte}>
              <Text style={styles.nomOfficiel}>{item.name.official}</Text>
              <Text style={styles.autre}>{item.region}</Text>
              <Text style={styles.autre}>{item.flag}</Text>
              <Text style={styles.autre}>{item.subregion}</Text>
              <Text style={styles.autre}>{item.capital}</Text>
              <Text style={styles.autre}>{item.population}</Text>
            </View>
          </View>
          <View style={styles.separateur} />
        </View>
      </TouchableHighlight>
    );
  }
}