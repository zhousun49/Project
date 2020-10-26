import React from "react";
import axios from "axios";
import API from './API'
import {Table, Button} from "react-bootstrap"
import {Link, Redirect} from 'react-router-dom';
import {LineChart, XAxis, Tooltip, CartesianGrid, Line} from 'recharts'
class SingleState extends React.Component {
    constructor(props) {
        super(props);
        const cap_state = props.match.params.state.charAt(0).toUpperCase() + props.match.params.state.slice(1)
        this.state = {
            state: cap_state,
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
        axios.get(`${API}/cases/state/${this.state.state}`)
            .then((res) =>{
                // console.log('Response', res)
                this.setState({
                    case: res.data.case,
                    count: res.data.count
                })
            })
    }

    render() {
        if(this.state.back){
            return(
                <Redirect to = {{pathname: `/states`}}/>
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
                        <XAxis dataKey="date" />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="active" stroke="#ff7300" yAxisId={0} />
                        <Line type="monotone" dataKey="confirmed" stroke="#387908" yAxisId={1} />
                        <Line type="monotone" dataKey="death" stroke="#131223" yAxisId={2} />
                    </LineChart>
                </div>
                <div style = {{padding: '5% 10%'}}>
                    <LineChart
                        width={1200}
                        height={400}
                        data={this.state.case}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                        <XAxis dataKey="date"/>
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="incident_rate" stroke="#ff7300" yAxisId={0} />
                        <Line type="monotone" dataKey="mortality_rate" stroke="#387908" yAxisId={1} />
                        <Line type="monotone" dataKey="testing_rate" stroke="#131223" yAxisId={2} />
                    </LineChart>
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
                        <th>Testing Rate</th>
                        </tr>
                    </thead>
                        <tbody>
                            {this.state.case.map(( listValue, index ) => {
                                return (
                                    <tr key={index}>
                                        <Link to={`/state/${this.state.state}/${listValue.date}`} key = {index} style = {{textDecoration: "none"}}>
                                            <th>{listValue.date}</th>
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
                        <Button variant="primary" type="submit" active onClick= {this.backhandler}>Do Another Search on States</Button>
                </div>
            </div>
        )
    }
  }

export default SingleState;