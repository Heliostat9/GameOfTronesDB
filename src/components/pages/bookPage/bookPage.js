import React, {Component} from 'react';
import gotService from '../../../services/gotSevice';
import ItemList from '../../itemList';
import ErrorMessage from '../../errorMessage';
import {withRouter} from 'react-router-dom'

class BookPage extends Component {
    state = {
        error: false
    }

    gotService = new gotService();

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
        

        return (
            <ItemList 
                    onItemSelected={(itemId) => {
                        this.props.history.push(itemId);
                    }}
                    getData={this.gotService.getAllBooks}
                    renderItem={({name, publisher}) => `${name} (${publisher})`}
                    />
        )
    }


}

export default withRouter(BookPage)