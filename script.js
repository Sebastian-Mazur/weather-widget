class App extends React.Component {
	constructor() {
		super();
		this.state = {			
			searchText: '',
			items: {
				astronomy: {
					sunset: '',
					sunrise: ''
				},
				lastBuildDate: '',
				location: {
					city: '',
					country: '',
					region: ''
				},
				item: {
					condition: {
						code: '',
						date: '',
						temp: '',
						text: '',
					},
					forecast: []
				}
			},			
		};
	}

	componentWillMount() {
		const url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22katowice%2C%20ak%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
		fetch(url)
			.then(response => response.json())
			.then(responseJson => this.setState({
				items: responseJson.query.results.channel
			}));	
	}

	onChangeHandle(event) {
		this.setState({searchText: event.target.value});
	}

	onSubmit(event) {
		event.preventDefault();
		const {searchText} = this.state;
		const url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${searchText}%2C%20ak%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`; 	
		fetch(url)
			.then(response => response.json())
			.then(responseJson => this.setState({items: responseJson.query.results.channel}));			
	}

	render() {	
		console.log(this.state.items);		
		return (
			<div className="app-container">
				<form onSubmit={event => this.onSubmit(event)}>
					<label htmlFor='searchText'>Search by city name</label>
					<br />
					<input
						type='text'
						id='searchText'
						onChange={event => this.onChangeHandle(event)}
						value={this.state.searchText}/>
				</form>
				<WeatherContainer					
					date={this.state.items.lastBuildDate}
					sunset={this.state.items.astronomy.sunset}
					sunrise={this.state.items.astronomy.sunrise}
					city={this.state.items.location.city}
					country={this.state.items.location.country}
					region={this.state.items.location.region}
					code={this.state.items.item.condition.code}
					temp={this.state.items.item.condition.temp}
					text={this.state.items.item.condition.text}
					forecast={this.state.items.item.forecast}					
				/>
								
			</div>
		);
	}
}

class WeatherContainer extends React.Component {
	get forecast() {
		// console.log(this.props.forecast[0]);
		// for (var i = 1, )
		return this.props.forecast.map(perDay => <WeatherPerDay key={perDay.day} perDay={perDay} />)
	}

	render() {	
		console.log(this.props.forecast);
		return (
			<div className="weather-container">
				<div className="currentWeather">
					<p className="weather-location">{this.props.city}, {this.props.region}, {this.props.country}</p> 					
					<p className="date">{this.props.date}</p>					
					<p><i className="wi wi-sunrise astronomy" /> {this.props.sunrise}</p>
					<p><i className="wi wi-sunset astronomy" /> {this.props.sunset}</p>					
					<div className="temp-graffic">						
						<WeatherIcon weatherCode={this.props.code}/>
						<p>{this.props.text}</p>				
						<p className="temp">{this.props.temp}&deg;</p>						
					</div>
					
				</div>
				{this.forecast}							
			</div>
		);
	}
}

class WeatherPerDay extends React.Component {
	
	render() {			
		return (
			<div className="forecast">
				<p>{this.props.perDay.date}</p>
				{/* <WeatherIcon weatherCode={this.props.perDay.code} /> */}
				<p>Max temp: {this.props.perDay.high}</p>
				<p>Min temp: {this.props.perDay.low}</p>
				<p> {this.props.perDay.text}</p>
			</div>
		);
	}
}

class WeatherIcon extends React.Component {	
	render() {		
		var weather = function(code) {
			const icon = document.getElementById('weather-icon');
			switch (code) {
				case '0':
					icon.className = "icon wi wi-tornado";
					break;
				case '1':
				case '3':
				case '4':
					icon.className = "icon wi wi-thunderstorm";
					break;
				case '2':
					icon.className = "icon wi wi-hurricane";
					break;				
				case '5':
					icon.className = "icon wi wi-day-snow-thunderstorm";
					break;
				case '6':
					icon.className = "icon wi wi-day-sleet-storm";
					break;
				case '7':
				case '8':
					icon.className = "icon wi wi-sleet";
					break;
				case '9':
					icon.className = "icon wi wi-day-showers";
					break;
				case '10':
					icon.className = "icon wi wi-day-rain-wind";
					break;
				case '11':
				case '12':
					icon.className = "icon wi wi-showers";
					break;
				case '13':
				case '15':
					icon.className = "icon wi wi-day-snow-wind";
					break;
				case '13':
				case '16':
					icon.className = "icon wi wi-snow";
					break;
				case '17':
					icon.className = "icon wi wi-hail";
					break;
				case '18':
					icon.className = "icon wi wi-sleet";
					break;
				case '19':
					icon.className = "icon wi wi-dust";
					break;
				case '20':
				case '21':
				case '22':
				case '23':
					icon.className = "icon wi wi-fog";
					break;
				case '24':
					icon.className = "icon wi wi-windy";
					break;				
				case '25':
					icon.className = "icon wi wi-snowflake-cold";
					break;
				case '26':
					icon.className = "icon wi wi-cloudy";
					break;
				case '27':
					icon.className = "icon wi wi-night-cloudy-high";
					break;
				case '28':
					icon.className = "icon wi wi-day-cloudy-high";
					break;
				case '29':
					icon.className = "icon wi wi-night-partly-cloudy";
					break;
				case '30':
					icon.className = "icon wi wi-day-sunny-overcast";
					break;
				case '31':
				case '34':
					icon.className = "icon wi wi-night-clear";
					break;				
				case '32':
				case '33':
					icon.className = "icon wi wi-day-sunny";
					break;
				case '35':
					icon.className = "icon wi wi-day-hail";
					break;
				case '36':
					icon.className = "icon wi wi-hot";
					break;
				case '37':
				case '38':
				case '39':
					icon.className = "icon wi wi-lightning";
					break;
				case '40':
					icon.className = "icon wi wi-snow";
					break;
				case '41':
				case '42':
				case '43':
				case '45':
					icon.className = "icon wi wi-snow-wind";
					break;
				case '44':
					icon.className = "icon wi wi-day-cloudy";
					break;
				case '45':
					icon.className = "icon wi wi-storm-showers";
					break;
				case '47':
					icon.className = "icon wi wi-day-storm-showers";
					break;
				case '3200':
					icon.className = "icon wi wi-alien";
					break;
			}
		}

		weather(this.props.weatherCode);

		return (
			<div>
				<i id="weather-icon" />
			</div>
		);		
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('root')
);
