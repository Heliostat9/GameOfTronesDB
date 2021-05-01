import React, {Component} from 'react';
import './itemDetails.css';
import gotService from '../../services/gotSevice';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
    console.log(item);
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        
        if (this.props.itemId !== prevProps.itemId) {
            this.setState({
                loading: true
            })
            this.updateChar();
        }
    }



    updateChar() {
        const {itemId} = this.props;

        if (!itemId) {
            return
        }

        this.props.getItem(itemId)
                        .then((item) => {
                            this.setState({
                                item,
                                loading: false
                            })
                        })
                        .catch(() => this.onError());
        //this.foo.bar();
    }

    onError() {
        this.setState({
            item: null,
            error: true
        })
    }

    render() {

        if (!this.state.item && this.state.error) {
            return <ErrorMessage />
        } else if (!this.state.item) {
            return <span className="select-error">Please select a character</span>
        }

        const content = this.state.loading ? <Spinner /> : <View item={this.state.item} childs={this.props.children}/>;

        return (
            <div className="item-details rounded">
                {content}
            </div>
        );
    }
}

const View = (props) => {
    const {name} = props.item;
    const {item} = props;
    console.log(props.childs);
    return(
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(props.childs, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </>
    ) 
}