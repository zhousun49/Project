import React from "react";
import axios from "axios";
import {Table, Button} from "react-bootstrap"
import {Link, Redirect} from 'react-router-dom';
import {BarChart, Bar, XAxis, Tooltip, CartesianGrid, Legend} from 'recharts'

class SingleWorldDate extends React.Component {
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
        if(this.state.date === '2020-09-'){
            axios.get(`http://3.15.233.55:5000/world/`)
                .then((res) =>{
                    console.log('ressssss', res)
                    this.setState({
                        case: res.data
                    })
                })
        }
        else{
            axios.get(`http://3.15.233.55:5000/world/date/${this.state.date}`)
                .then((res) =>{
                    console.log('ressssss', res)
                    this.setState({
                        case: res.data
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
        if(this.state.date === '2020-09-'){
            return(            <div>
                <div>
                    <h1 style = {{textAlign:'center', padding:'10%'}}>Worldwide COVID cases in 2020-09</h1>
                </div>
                <div style = {{padding: '0% 5%'}}>    
                    <Table>
                    <thead>
                        <tr>
                        <th>Country</th>
                        <th>Date</th>
                        <th>Active</th>
                        <th>Confirmed</th>
                        <th>deaths</th>
                        <th>Recovered</th>
                        <th>Incident Rate</th>
                        </tr>
                    </thead>
                        <tbody>
                            {this.state.case.map(( listValue, index ) => {
                                return (
                                    <tr key={index}>
                                        <Link to={`/country/${listValue.Country_Region}/${listValue.Last_Update}`} key = {index} style = {{textDecoration: "none"}}>
                                            <th>{listValue.Country_Region}</th>
                                        </Link>
                                            <th>{listValue.Last_Update}</th>
                                            <th>{listValue.active}</th>
                                            <th>{listValue.confirmed}</th>
                                            <th>{listValue.deaths}</th>
                                            <th>{listValue.recovered}</th>
                                            <th>{listValue.incident_rate}</th>
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
                    <h1 style = {{textAlign:'center', padding:'10%'}}>Trends of COVID cases Worldwide on {this.state.date}</h1>
                </div>
                <div style = {{padding: '5% 10%'}}>
                    <BarChart
                        width={1200}
                        height={400}
                        data={this.state.case}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                        <XAxis dataKey="Country_Region" />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Bar type="monotone" dataKey="active" fill="#ff7300" yAxisId={0} />
                        <Bar type="monotone" dataKey="confirmed" fill="#387908" yAxisId={1} />
                        <Bar type="monotone" dataKey="deaths" fill="#131223" yAxisId={2} />
                        <Bar type="monotone" dataKey="recovered" fill="#131223" yAxisId={3} />
                    </BarChart>
                </div>
                <div style = {{padding: '5% 10%'}}>
                    <BarChart
                        width={1200}
                        height={400}
                        data={this.state.case}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                        <XAxis dataKey="Country_Region"/>
                        <Tooltip />
                        <Legend />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Bar type="monotone" dataKey="incident_rate" fill="#ff7300" yAxisId={0} />
                        <Bar type="monotone" dataKey="case-Fatality_Ratio" fill="#387908" yAxisId={1} />
                    </BarChart>
                </div>
                <div style = {{padding: '0% 5%'}}>    
                    <Table>
                    <thead>
                        <tr>
                        <th>Country</th>
                        <th>Date</th>
                        <th>Active</th>
                        <th>Confirmed</th>
                        <th>deaths</th>
                        <th>Recovered</th>
                        <th>Incident Rate</th>
                        </tr>
                    </thead>
                        <tbody>
                            {this.state.case.map(( listValue, index ) => {
                                return (
                                    <tr key={index}>
                                        <Link to={`/country/${listValue.Country_Region}/${listValue.Last_Update}`} key = {index} style = {{textDecoration: "none"}}>
                                            <th>{listValue.Country_Region}</th>
                                        </Link>
                                            <th>{listValue.Last_Update}</th>
                                            <th>{listValue.active}</th>
                                            <th>{listValue.confirmed}</th>
                                            <th>{listValue.deaths}</th>
                                            <th>{listValue.recovered}</th>
                                            <th>{listValue.incident_rate}</th>
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

export default SingleWorldDate;