<template>
<div id="schedule">
<day v-for="d in Object.keys(fiveDays)" :events="fiveDays[d]" :date="d" :key="d"></day>
</div>
</template>

<script>
	import Day from './Day'
	import axios from "axios";
	import moment from 'moment';

	export default {
		name: "Schedule",
		components: {
			Day
		},
		data () {
			return {
				days: {},
				fetched: false
			}
		},
		methods: {
			fetchData() {
				axios.get(window.APIROOT + "/calendar/events").then(response => {
					this.days = []
					response.data.forEach(function(event){
						this.fetched = false
						if (event.start.dateTime){
							event.start.dateTime = moment(event.start.dateTime).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
						}
						else {
							event.start.dateTime = moment(event.start.date).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
						}

						let start = moment(event.start.dateTime);

						if (Object.keys(this.days).includes(start.format('YYYY/MM/DD'))) {
							this.days[start.format('YYYY/MM/DD')].push(event)
						}
						else {
							this.days[start.format('YYYY/MM/DD')] = [event]
						}
						this.fetched = true
					}, this)
				})
			}
		},
		created () {
			this.fetchData()
			setInterval(() => this.fetchData(), 15 * 60 * 1000);
		},
		computed: {
			fiveDays () {
				if (!this.fetched){
					return {}
				}
				let out = {}
				for (let i=0; i<5; i++){
					let date = moment().add(i, 'days').format('YYYY/MM/DD')
					console.log(date, this.days)
					out[date] = this.days[date] || []
					out[date].sort(function(a, b){
						return moment(a.start.dateTime) - moment(b.start.dateTime)
					})
				}

				return out
			}
		}
	}
</script>

<style scoped>
#schedule {
	width: 75%;
	bottom: 0;
	position: absolute;
	height: 60%;
	margin-bottom: 25px;
	margin-left: 25px;
	overflow-x: auto;
	overflow-y: hidden;
	white-space: nowrap;
}
</style>
