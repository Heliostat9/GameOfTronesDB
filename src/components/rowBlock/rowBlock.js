import React, {Component,useState} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';

const RowBlock = ({left, right}) => {
    return (
        <Row>
            <Col md='6'>
                {left()}
            </Col>
            <Col md='6'>
                {right()}
            </Col>
        </Row>
    )
}

export default RowBlock;