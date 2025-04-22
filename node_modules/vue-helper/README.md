# vue-helper

VueJS Helper

Declare state as class:
```

export class MainPageState
{
	username: string = "";


	/**
	 * Returns methods list
	 */
	static mutations(): Array<string>
	{
		let res: Array<string> =
		[
		];
		return res;
	}


	/**
	 * Returns modules
	 */
	static modules(): Record<string, any>
	{
		let res: Record<string, any> =
		{
		};
		return res;
	}

}


export class AppState
{
	MainPage: MainPageState = new MainPageState();


	/**
	 * Returns methods list
	 */
	static mutations(): Array<string>
	{
		let res: Array<string> =
		[
		];
		return res;
	}


	/**
	 * Returns modules
	 */
	static modules(): Record<string, any>
	{
		let res: Record<string, any> =
		{
			"MainPage": MainPageState,
		};
		return res;
	}

}
```

Create store from class:
```
/* Create app state */
let Store = buildStore(AppState);

/* Create app */
var app = createApp(App)
	.use(Store)
	.use(Router)
	.mount('#app')
```

Declare Vue component:
```
<style lang="scss" scoped>
</style>


<template>
	<div class="page_home">
		Hello {{ model.username }} !!!
	</div>
	<button @click="onClick">
		Click
	</button>
</template>

<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";

export default defineComponent({
	mixins: [ mixin ],
	computed:
	{
	},
	methods:
	{
		onClick()
		{
			console.log(this.model.username);
		}
	}
});

</script>
```

Declare Router:
```
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'MainPage',
		component: MainPage,
		props: { store_path: ["MainPage"] }
	},
]

const router = createRouter({
	history: createWebHistory("/"),
	routes
})

export default router
```
