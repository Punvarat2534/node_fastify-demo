<!--
 * MIT License
 *
 * Copyright (c) 2021 Ildar Bikmamatov <support@bayrell.org>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
-->

<style lang="scss">
@import '@/variable.scss';
button.component_button{
	padding: 6px 12px;
    cursor: pointer;
    background-color: #fff;
    border: 1px #ccc solid;
    color: #000;
    /* box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 25%); */
    outline: 0;
}
button.component_button:active{
	box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25);
}
button.component_button.small{
	padding: 3px 6px;
}
button.component_button.primary{
	background-color: $color_primary;
	border: 1px darken($color_primary, 5%) solid;
	color: #fff;
}
button.component_button.primary:hover{
	background-color: darken($color_primary, 5%);
	border: 1px darken($color_primary, 10%) solid;
	color: #fff;
}
button.component_button.danger{
	background-color: $color_danger;
    border: 1px darken($color_danger, 5%) solid;
    color: #fff;
}
button.component_button.danger:hover{
	background-color: darken($color_danger, 5%);
    border: 1px darken($color_danger, 10%) solid;
	color: #fff;
}
button.component_button.success{
	background-color: $color_success;
	border: 1px darken($color_success, 5%) solid;
	color: #fff;
}
button.component_button.success:hover{
	background-color: darken($color_success, 5%);
	border: 1px darken($color_success, 10%) solid;
	color: #fff;
}
</style>


<template>
	<button class="component_button" v-bind:class="getButtonClass" @click="onClick"><slot/></button>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";

export const Button =
{
	mixins: [ mixin ],
    props: ["type", "small"],
	computed:
	{
		getButtonClass: function()
		{
			let arr = ["button"];
			if (this.small == "true") arr.push("small");
			if (this.type) arr.push(this.type);
			return arr.join(" ");
		},
	},
	methods:
	{
		onClick: function()
		{
			//this.$emit("click");
		},
	},
	components:
	{
	},
};

export default defineComponent(Button);

</script>
