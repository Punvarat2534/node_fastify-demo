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
.component_input{
	width: 100%;
	padding: 6px 12px;
	background-color: white;
	border: 1px #ccc solid;
	outline: transparent;
}
</style>


<template>
	<input class="component_input" v-bind:name="name" v-bind:type="type" v-bind:value="value"
		@change="onChange(name, $event)"
	/>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin, componentExtend } from 'vue-helper';
import { CrudEvent, CRUD_EVENTS } from "./CrudState";
import { Field } from './Field.vue';


export const Input =
{
	mixins: [ mixin ],
	emits: Field.emits,
	props: Field.props,
	computed:
	{
	},
	methods:
	{
		onChange: function(name, $event)
		{
			let event = new CrudEvent();
			event.event_name = CRUD_EVENTS.ITEM_CHANGE;
			event.item_name = name;
			event.value = $event.target.value;
			this.$emit( "crudEvent", event );
		}
	},
	components:
	{
	},
};

componentExtend(Input, Field);
export default defineComponent(Input);

</script>
