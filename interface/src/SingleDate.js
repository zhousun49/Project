import React from "react";
import axios from "axios";
import API from './API'
import {Table, Button} from "react-bootstrap"
import {Link, Redirect} from 'react-router-dom';
import {BarChart, Bar, Legend, XAxis, Tooltip, CartesianGrid} from 'recharts'

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
        if(this.state.date === '09--2020'){
            console.log('emptyyyyy')
            axios.get(`${API}/cases/`)
                .then((res) =>{
                    console.log('ressssss', res)
                    this.setState({
                        case: res.data.cases
                    })
                })
        }
        else{
            axios.get(`${API}/cases/date/${this.state.date}`)
                .then((res) =>{
                    console.log('ressssss', res)
                    this.setState({
                        case: res.data.case
                    })
                })
        }

    }

    render() {
        if(this.state.back){
            return(
                <Redirect to = {{pathname: `/dates`}}/>
            )
        }
        if(this.state.date === '09--2020'){
            return (<div>
                <div>
                    <h1 style = {{textAlign:'center', padding:'10%'}}>US COVID cases on 2020-09</h1>
                </div>
                <div style = {{padding: '0% 5%'}}>    
                    <Table>
                    <thead>
                        <tr>
                        <th>State</th>
                        <th>Date</th>
                        <th>Active</th>
                        <th>Confirmed</th>
                        <th>Death</th>
                        <th>Incident Rate</th>
                        <th>Mortality Rate</th>
                        <th>People Tested</th>
                        <th>Testing Rate</th>
                        </tr>
                    </thead>
                        <tbody>
                            {this.state.case.map(( listValue, index ) => {
                                return (
                                    <tr key={index}>
                                        <Link to={`/state/${listValue.state}/${this.state.date}`} key = {index} style = {{textDecoration: "none"}}>
                                            <th>{listValue.state}</th>
                                        </Link>
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
                        <Button variant="primary" type="submit" active onClick= {this.backhandler}>Do Another Search on dates</Button>
                </div>
            </div>)
        }
        return (
            <div>
                <div>
                    <h1 style = {{textAlign:'center', padding:'10%'}}>Trends of COVID cases on {this.state.date}</h1>
                </div>
                <div style = {{padding: '5% 10%'}}>
                    <BarChart
                        width={1200}
                        height={400}
                        data={this.state.case}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                        <XAxis dataKey="state" />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Bar type="monotone" dataKey="active" fill="#ff7300" yAxisId={0} />
                        <Bar type="monotone" dataKey="confirmed" fill="#387908" yAxisId={1} />
                        <Bar type="monotone" dataKey="death" fill="#131223" yAxisId={2} />
                    </BarChart>
                </div>
                <div style = {{padding: '5% 10%'}}>
                    <BarChart
                        width={1200}
                        height={400}
                        data={this.state.case}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                        <XAxis dataKey="state"/>
                        <Tooltip />
                        <Legend />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Bar type="monotone" dataKey="incident_rate" fill="#ff7300" yAxisId={0} />
                        <Bar type="monotone" dataKey="mortality_rate" fill="#387908" yAxisId={1} />
                    </BarChart>
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
                        <th>Testing Rate</th>
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