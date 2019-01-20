<template>
<div :class="{day: true, today: today}">
<h1>{{title}}</h1>
	<span class="date" v-if="monthday">{{monthday}}</span>
	<div class="events">
		<event v-for="e in events" :data="e" :key="e.id" :split="sameTime.includes(e.start.dateTime)"></event>
		<v-icon scale="6" class="noevents" name="grin" v-if="events.length == 0"/>
	</div>
</div>
</template>

<script>
	import Event from './Event';
	import moment from 'moment';
	export default {
		name: "Day",
		props: ['events', 'date'],
		data () {
			return {
				today: false
			}
		},
		components: {
			Event
		},
		methods: {
			testDay () {
				this.today = (moment().format('YYYY/MM/DD') === this.date && this.events.length > 0)
			}
		},
		created () {
			this.testDay()
			setInterval(() => this.testDay(), 60 * 60 * 1000 * 0.5);
		},
		computed: {
			title (){
				return moment(this.date).format('dddd')
				/*if (moment().format('YYYY/MM/DD') === this.date){
					return 'Today'
				}
				else if (moment().add(1, 'days').format('YYYY/MM/DD') === this.date){
					return 'Today'
				}*/
			},
			monthday () {
				if (moment().format('YYYY/MM/DD') === this.date){
					return false
				}
				else {
					return moment(this.date).format('Do')
				}
			},
			addStyle(){
				if (moment().format('YYYY/MM/DD') === this.date && this.events.length > 0){
					return {'width': '50%'}
				}
			},
			sameTime(){
				let seen = [];
				let duplicates = [];

				for (let i in this.events){
					if (seen.includes(this.events[i].start.dateTime)){
						duplicates.push(this.events[i].start.dateTime)
					}
					seen.push(this.events[i].start.dateTime)
				}
				return duplicates
			}
		}
	}
</script>

<style scoped>
.day {
	background: rgba(0, 0, 0, 0.6);
	display: inline-block;
	width: 24.3%; /*19.6%*/
	height: 100%;
	border-radius: 10px;
}

.today {
	width: 50%;
}

	.day:not(:last-child) { margin-right:5px}
.day:first-child { background: linear-gradient(0deg, rgba(0,0,0,0.6) 30%, rgba(255,0,255,0.6) 100%);}

	.events {
		overflow-y: auto;
		height: 88%;
	}

	h1 {
		font-family: Roboto;
		color: white;
		margin-top: 5px;
		margin-bottom: 5px;
		font-size: 1.8em;
	}

	.noevents {
		color: rgba(150, 150, 150, 0.9);
		top: 20%;
		position: relative;
	}

	.date {
		color: ghostwhite;
		opacity: 0.8;
		position: absolute;
		transform: translate(-50%, -11px);
		font-size: 10px;

	}
</style>
