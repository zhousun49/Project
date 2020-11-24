import React from "react";
import axios from "axios";
import {Table, Button} from "react-bootstrap"
import {Link, Redirect} from 'react-router-dom';
import {LineChart, XAxis, Tooltip, CartesianGrid, Line} from 'recharts'
class SingleCountry extends React.Component {
    constructor(props) {
        super(props);
        const cap_state = props.match.params.state.charAt(0).toUpperCase() + props.match.params.state.slice(1)
        this.state = {
            state: cap_state,
            case: [],
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
        // console.log('ur;" ', `http://3.15.233.55:5000/world/country/${this.state.state}`)
        if (this.state.state==="All"){
        axios.get(`http://3.15.233.55:5000/world/`)
            .then((res) =>{
                this.setState({
                    case: res.data
                })
            })
        }
        else{
            axios.get(`http://3.15.233.55:5000/world/country/${this.state.state}`)
            .then((res) =>{
                this.setState({
                    case: res.data
                })
            })
        }       
    }

    render() {
        if(this.state.back){
            return(
                <Redirect to = {{pathname: `/countries`}}/>
            )
        }
        console.log(this.state.state)
        if(this.state.state==="All"){
            return (
            <div>
                <div>
                    <h1 style = {{textAlign:'center', padding:'10%'}}>Trends of COVID cases for {this.state.state} in September</h1>
                </div>
                <div style = {{padding: '0% 5%'}}>    
                    <Table>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Country</th>
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
                                            <th>{listValue.Last_Update}</th>
                                        </Link>
                                            <th>{listValue.Country_Region}</th>
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
                        <Button variant="primary" type="submit" active onClick= {this.backhandler}>Do Another Search on Country</Button>
                </div>
            </div>
            )
        }
        return (
            <div>
                <div>
                    <h1 style = {{textAlign:'center', padding:'10%'}}>Trends of COVID cases for {this.state.state} in September</h1>
                </div>
                <div style = {{padding: '5% 10%'}}>
                    <LineChart
                        width={1200}
                        height={400}
                        data={this.state.case}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                        <XAxis dataKey="Last_Update" />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="active" stroke="#ff7300" yAxisId={0} />
                        <Line type="monotone" dataKey="deaths" stroke="#131223" yAxisId={1} />
                    </LineChart>
                </div>
                <div style = {{padding: '5% 10%'}}>
                    <LineChart
                        width={1200}
                        height={400}
                        data={this.state.case}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                        <XAxis dataKey="Last_Update" />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="confirmed" stroke="#387908" yAxisId={0} />
                        <Line type="monotone" dataKey="recovered" stroke="#131223" yAxisId={1} />
                    </LineChart>
                </div>
                <div style = {{padding: '0% 5%'}}>    
                    <Table>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Country</th>
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
                                        <Link to={`/country/${this.state.state}/${listValue.Last_Update}`} key = {index} style = {{textDecoration: "none"}}>
                                            <th>{listValue.Last_Update}</th>
                                        </Link>
                                            <th>{listValue.Country_Region}</th>
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
                        <Button variant="primary" type="submit" active onClick= {this.backhandler}>Do Another Search on Country</Button>
                </div>
            </div>
        )
    }
  }

export default SingleCountry;