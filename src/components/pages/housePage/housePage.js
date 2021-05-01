import React, {Component} from 'react';
import gotService from '../../../services/gotSevice';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import RowBlock from '../../rowBlock';

export default class CharacterPage extends Component {

    gotSevice = new gotService();

    state = {
        selectedHouse: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
        console.log(id);
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
                        getData={this.gotSevice.getAllHouse}
                        renderItem={({name, region}) => `${name} (${region})`}
                        />
        )

        const charDetails = () => (
            <ItemDetails 
                itemId={this.state.selectedHouse} 
                getItem={this.gotSevice.getHouse}>
                <Field field='region' label="Region"/>
                <Field field='words' label="Words"/>
                <Field field='titles' label="Titles"/>
                <Field field='overlord' label="Overlord"/>
                <Field field='ancestralWeapons' label="Ancestral Weapons"/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}