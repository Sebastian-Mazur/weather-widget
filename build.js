'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

		_this.state = {
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
						text: ''
					},
					forecast: []
				}
			}
		};
		return _this;
	}

	_createClass(App, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22katowice%2C%20ak%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
			fetch(url).then(function (response) {
				return response.json();
			}).then(function (responseJson) {
				return _this2.setState({
					items: responseJson.query.results.channel
				});
			});
		}
	}, {
		key: 'onChangeHandle',
		value: function onChangeHandle(event) {
			this.setState({ searchText: event.target.value });
		}
	}, {
		key: 'onSubmit',
		value: function onSubmit(event) {
			var _this3 = this;

			event.preventDefault();
			var searchText = this.state.searchText;

			var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + searchText + '%2C%20ak%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
			fetch(url).then(function (response) {
				return response.json();
			}).then(function (responseJson) {
				return _this3.setState({ items: responseJson.query.results.channel });
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			console.log(this.state.items);
			return React.createElement(
				'div',
				{ className: 'app-container' },
				React.createElement(
					'form',
					{ onSubmit: function onSubmit(event) {
							return _this4.onSubmit(event);
						} },
					React.createElement(
						'label',
						{ htmlFor: 'searchText' },
						'Search by city name'
					),
					React.createElement('br', null),
					React.createElement('input', {
						type: 'text',
						id: 'searchText',
						onChange: function onChange(event) {
							return _this4.onChangeHandle(event);
						},
						value: this.state.searchText })
				),
				React.createElement(WeatherContainer, {
					date: this.state.items.lastBuildDate,
					sunset: this.state.items.astronomy.sunset,
					sunrise: this.state.items.astronomy.sunrise,
					city: this.state.items.location.city,
					country: this.state.items.location.country,
					region: this.state.items.location.region,
					code: this.state.items.item.condition.code,
					temp: this.state.items.item.condition.temp,
					text: this.state.items.item.condition.text,
					forecast: this.state.items.item.forecast
				})
			);
		}
	}]);

	return App;
}(React.Component);

var WeatherContainer = function (_React$Component2) {
	_inherits(WeatherContainer, _React$Component2);

	function WeatherContainer() {
		_classCallCheck(this, WeatherContainer);

		return _possibleConstructorReturn(this, (WeatherContainer.__proto__ || Object.getPrototypeOf(WeatherContainer)).apply(this, arguments));
	}

	_createClass(WeatherContainer, [{
		key: 'render',
		value: function render() {
			console.log(this.props.forecast);
			return React.createElement(
				'div',
				{ className: 'weather-container' },
				React.createElement(
					'div',
					{ className: 'currentWeather' },
					React.createElement(
						'p',
						{ className: 'weather-location' },
						this.props.city,
						', ',
						this.props.region,
						', ',
						this.props.country
					),
					React.createElement(
						'p',
						{ className: 'date' },
						this.props.date
					),
					React.createElement(
						'p',
						null,
						React.createElement('i', { className: 'wi wi-sunrise astronomy' }),
						' ',
						this.props.sunrise
					),
					React.createElement(
						'p',
						null,
						React.createElement('i', { className: 'wi wi-sunset astronomy' }),
						' ',
						this.props.sunset
					),
					React.createElement(
						'div',
						{ className: 'temp-graffic' },
						React.createElement(WeatherIcon, { weatherCode: this.props.code }),
						React.createElement(
							'p',
							null,
							this.props.text
						),
						React.createElement(
							'p',
							{ className: 'temp' },
							this.props.temp,
							'\xB0'
						)
					)
				),
				this.forecast
			);
		}
	}, {
		key: 'forecast',
		get: function get() {
			// console.log(this.props.forecast[0]);
			// for (var i = 1, )
			return this.props.forecast.map(function (perDay) {
				return React.createElement(WeatherPerDay, { key: perDay.day, perDay: perDay });
			});
		}
	}]);

	return WeatherContainer;
}(React.Component);

var WeatherPerDay = function (_React$Component3) {
	_inherits(WeatherPerDay, _React$Component3);

	function WeatherPerDay() {
		_classCallCheck(this, WeatherPerDay);

		return _possibleConstructorReturn(this, (WeatherPerDay.__proto__ || Object.getPrototypeOf(WeatherPerDay)).apply(this, arguments));
	}

	_createClass(WeatherPerDay, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'forecast' },
				React.createElement(
					'p',
					null,
					this.props.perDay.date
				),
				React.createElement(
					'p',
					null,
					'Max temp: ',
					this.props.perDay.high
				),
				React.createElement(
					'p',
					null,
					'Min temp: ',
					this.props.perDay.low
				),
				React.createElement(
					'p',
					null,
					' ',
					this.props.perDay.text
				)
			);
		}
	}]);

	return WeatherPerDay;
}(React.Component);

var WeatherIcon = function (_React$Component4) {
	_inherits(WeatherIcon, _React$Component4);

	function WeatherIcon() {
		_classCallCheck(this, WeatherIcon);

		return _possibleConstructorReturn(this, (WeatherIcon.__proto__ || Object.getPrototypeOf(WeatherIcon)).apply(this, arguments));
	}

	_createClass(WeatherIcon, [{
		key: 'render',
		value: function render() {
			var weather = function weather(code) {
				var icon = document.getElementById('weather-icon');
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
			};

			weather(this.props.weatherCode);

			return React.createElement(
				'div',
				null,
				React.createElement('i', { id: 'weather-icon' })
			);
		}
	}]);

	return WeatherIcon;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
