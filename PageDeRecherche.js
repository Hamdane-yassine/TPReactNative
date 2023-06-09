import React, { Component } from 'react';
    import {
     StyleSheet,
     Text,
     TextInput,
     View,
     Button,
     ActivityIndicator,
     Image,
    } from 'react-native';

    type Props = {};
    export default class PageDeRecherche extends Component<Props> {

    constructor(props) {
     super(props);
     this.state = {
     requeteDeRecherche: 'morocco',
     estEnChargement:false,
     };
    }

  _gererLaResponse = (response) => {
   this.setState({estEnChargement:false, message:''});
   this.props.navigation.navigate('Resultats', {listings: response});
  };

  _auChangementDeLaRecherche = (event) => {
    this.setState({ requeteDeRecherche: event.nativeEvent.text });
  };

  _executerRequete = (requete) => {
  console.log(requete);
  this.setState({estEnChargement: true});
  fetch(requete)
    .then(response => response.json())
    .then(json => this._gererLaResponse(json))
    .catch(error => this.setState({estEnChargement:false,
                                   message:'Quelque chose de mauvais s\'est produit'+ error}))
  };

  _auDemarrageDeLaRecherche = () => {
  const requete = urlPourRequete(this.state.requeteDeRecherche);
  this._executerRequete(requete);
  };

     render() {
     const indicateurDeChargement = this.state.estEnChargement?
     <ActivityIndicator size='large' color='ooooff'/> : null;
     return (
     <View style={styles.conteneur}>
     <Text style={styles.description}>
     Rechercher des pays à explorer !
     </Text>
     <Text style={styles.description}>
     Rechercher par nom
     </Text>
      <View style={styles.fluxDroite}>
      <TextInput
         underlineColorAndroid={'transparent'}
         style={styles.requeteEntree}
         value={this.state.requeteDeRecherche}
         onChange={this._auChangementDeLaRecherche}
         placeholder='Rechercher par nom de pays'
      />
       <Button
       onPress={this._auDemarrageDeLaRecherche}
       color='#48AAEC'
       title='Démarrer'
       />
      </View>
      <Image source={require('./Ressources/pays.png')} style={styles.image}/>
      {indicateurDeChargement}
      <Text style={styles.description}>{this.state.message}</Text>
     </View>
     );
     }
    }

    function urlPourRequete(valeur){
    return 'https://restcountries.com/v3.1/name/'+valeur;
    }

    const styles = StyleSheet.create({
     image: {
      width: 220,
      height: 140,
     },
     description: {
     marginBottom: 20,
     fontSize: 18,
     textAlign: 'center',
     color: '#656565'
     },
     conteneur: {
     padding: 30,
     marginTop: 65,
     alignItems: 'center'
     },
     fluxDroite: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
     },
     requeteEntree: {
      height: 36,
      padding: 4,
      marginRight: 5,
      flexGrow: 1,
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#48AAEC',
      borderRadius: 8,
      color: '#48AAEC',
     }
    });