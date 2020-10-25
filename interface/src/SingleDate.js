import React from "react";
import axios from "axios";
import API from './API'
import {Table, Button} from "react-bootstrap"
import {Link, Redirect} from 'react-router-dom';

class SingleDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.match.params.date,
            case: [],
            count: 0,
            back:false
        }
        this.backhandler = this.backhandler.bind(this)
    };

    backhandler() {
        this.setState({
            back:true
        })
    }

    componentDidMount() {
        console.log(this.state.date)
        axios.get(`${API}/cases/date/${this.state.date}`)
            .then((res) =>{
                console.log('Response', res)
                this.setState({
                    case: res.data.case,
                    count: res.data.count
                })
            })
    }

    render() {
        if(this.state.back){
            return(
                <Redirect to = {{pathname: `/dates`}}/>
            )
        }
        return (
            <div>
                <div>
                    <h1 style = {{textAlign:'center', padding:'10%'}}>Trends of COVID cases on {this.state.date}</h1>
                </div>
                <div style = {{padding: '0% 5%'}}>    
                    <Table>
                    <thead>
                        <tr>
                        <th>State</th>
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
                                        <Link to={`/state/${listValue.state}/${this.state.date}`} key = {index} style = {{textDecoration: "none"}}>
                                            <th>{listValue.state}</th>
                                        </Link>
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
                        <Button variant="primary" type="submit" active onClick= {this.backhandler}>Do Another Search on dates</Button>
                </div>
            </div>
        )
    }
  }

export default SingleDate;