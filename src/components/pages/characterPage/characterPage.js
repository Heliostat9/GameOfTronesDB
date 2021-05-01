import React, {Component} from 'react';
import gotService from '../../../services/gotSevice';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import RowBlock from '../../rowBlock';

export default class CharacterPage extends Component {

    gotSevice = new gotService();

    state = {
        selectedChar: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    componentDidCatch() {
        console.log('error!');
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = () => (
            <ItemList 
                        onItemSelected={this.onItemSelected}
                        getData={this.gotSevice.getAllCharacters}
                        renderItem={({name, gender}) => `${name} (${gender})`}
                        />
        )

        const charDetails = () => (
            <ItemDetails 
                itemId={this.state.selectedChar}
                getItem={this.gotSevice.getCharacter}>
                <Field field='gender' label="Gender"/>
                <Field field='born' label="Born"/>
                <Field field='died' label="Died"/>
                <Field field='culture' label="Culture"/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}