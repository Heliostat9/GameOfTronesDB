import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';
import BookPage from '../pages/bookPage';
import HousePage from '../pages/housePage';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BooksItem from '../pages/booksItem';

import './app.css'

export default class App extends Component {

    state = {
        visible: true,
        error: false
    }

    onToogleRandomCharacter = () => {

        this.setState(({visible}) => {
            return {
                visible: !visible
            }
        })
    }

    

    componentDidCatch() {
        console.log('error!');
        this.setState({
            error: true
        })
    }

    render() {
        const randomCharacter = this.state.visible ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <Router>
                <div className="app">  
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row className="mb-4">
                            <Col lg={{size: 5, offset: 0}}>
                                <Button onClick={this.onToogleRandomCharacter}>Toogle random character</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {randomCharacter}
                            </Col>
                        </Row>
                        <Route path="/" exact component={() => <h1>Welcome to GOT DB</h1>}/>
                        <Route path="/characters" component={CharacterPage}/>
                        <Route path="/houses" component={HousePage}/>
                        <Route path="/books" exact component={BookPage}/>    
                        <Route path="/books/:id" render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id}/>
                            } 
                        } />            
                    </Container>
                </div>
            </Router>
        );
    }
};

