import React from "react";
import {Table, Button} from "react-bootstrap"
import {Redirect} from 'react-router-dom';
import API from './API'
import axios from 'axios'

class SingleCase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: props.match.params.state,
            date: props.match.params.date,
            case: [],
            count: 0,
            back: false,
            dat: false
        }
        this.backhandler = this.backhandler.bind(this)
        this.datehandler = this.datehandler.bind(this)
    };

    componentDidMount() {
        axios.get(`${API}/cases/single/${this.state.state}/${this.state.date}`)
            .then((res) =>{
                // console.log('Response', res)
                this.setState({
                    case: res.data.case
                })
            })
    }
    
    backhandler() {
        this.setState({
            back:true
        })
    }

    datehandler() {
        this.setState({
            dat:true
        })
    }

    render() {
    if(this.state.back){
        return(
            <Redirect to = {{pathname: `/state/${this.state.state}`}}/>
        )
    }
    if(this.state.dat){
        return(
            <Redirect to = {{pathname: `/date/${this.state.date}`}}/>
        )
    }
      return (
        <div>
        <div>
            <h1 style = {{textAlign:'center', padding:'10%'}}>Covid 19 Cases of {this.state.state} on {this.state.date}</h1>
        </div>
        <div style = {{padding: '0% 5%'}}>    
                    <Table>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Active</th>
                        <th>Confirmed</th>
                        <th>Death</th>
                        <th>Incident Rate</th>
                        <th>Mortality Rate</th>
                        <th>People Tested</th>
                        <th>testing_rate</th>
                        </tr>
                    </thead>
                        <tbody>
                            {this.state.case.map(( listValue, index ) => {
                                return (
                                    <tr key={index}>
                                            <th>{listValue.date}</th>
                                            <th>{listValue.active}</th>
                                            <th>{listValue.confirmed}</th>
                                            <th>{listValue.death}</th>
                                            <th>{listValue.incident_rate}</th>
                                            <th>{listValue.mortality_rate}</th>
                                            <th>{listValue.people_tested}</th>
                                            <th>{listValue.testing_rate}</th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="Link" style = {{textAlign:'center', padding: '3%'}}>
                        <Button variant="primary" type="submit" active onClick= {this.backhandler}>View all {this.state.state} Cases</Button>
                </div>
                <div className="Link" style = {{textAlign:'center', paddingBottom: '5%'}}>
                        <Button variant="success" type="submit" active onClick= {this.datehandler}>View all Cases on {this.state.date}</Button>
                </div>
      </div>
      )
    }
  }

export default SingleCase;