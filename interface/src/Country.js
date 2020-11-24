import React from "react";
import {Form, Button, Col} from "react-bootstrap"
import {Redirect} from 'react-router-dom';

class Country extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: "",
            redirect: false
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this)
    };

    changeHandler = (e) => {
        this.setState({ state: e.target.value })
     }

    submitHandler(){
        console.log('current State', this.state)
        this.setState({
            redirect: true
        })
    }

    render() {
        if(this.state.redirect) {
            if(this.state.state){
                return <Redirect to = {{pathname: `/country/${this.state.state}`}}/>  
            }
            return <Redirect to = {{pathname: `/country/all`}}/>
        }
      return (
          <div>
            <div>
                <h1 style = {{textAlign:'center', padding:'10%'}}>Search for COVID cases trends for a single Country in September</h1>
            </div>
            <div style = {{padding:'0% 10%'}}>
                <Form>
                    <Form.Row>
                        <Col>
                        <Form.Control placeholder="Enter a Country name here..." onChange = {this.changeHandler}/>
                        </Col>
                        <Col xs="auto">
                        <Button type="submit" className="mb-2" onClick={this.submitHandler}>
                            Submit
                        </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
          </div>
      )
    }
  }

export default Country;