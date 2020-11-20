import React from "react";
import {Form, Button, Col} from "react-bootstrap"
import {Redirect} from 'react-router-dom';

class WorldDate extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            date: "",
            redirect: false
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this)
    };

    changeHandler = (e) => {
      let date = e.target.value
      if (date.length === 1){
        date = '0'+date
      }
        this.setState({ date: date })
    }

    submitHandler(){
        console.log('current State', this.state)
        this.setState({
            redirect: true
        })
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to = {{pathname: `/worlddate/2020-09-${this.state.date}`}}/>
        }
      return (
          <div>
            <div>
                <h1 style = {{textAlign:'center', padding:'10%'}}>Search for all COVID-19 cases on a single day Worldwide</h1>
            </div>
            <div style = {{padding:'0% 10%'}}>
                <Form>
                    <Form.Row>
                        <Col>
                        <Form.Control placeholder="Enter a day of September here..." onChange = {this.changeHandler}/>
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

export default WorldDate;