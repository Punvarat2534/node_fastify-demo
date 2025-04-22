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
.component_row_buttons button{
	margin-left: 2px;
	margin-right: 2px;
}
.component_row_button{
	display: inline-block;
	vertical-align: middle;
}
</style>


<template>
	<div class="component_row_buttons">
		
		<div class="component_row_button"
			v-if="crud.route_names != undefined && crud.route_names.edit != undefined"
		>
			<router-link custom
				:to="{ name: crud.route_names.edit, params: { id: getItemId() }}"
				v-slot="{ href, navigate, route }"
			>
				<a :href="href" @click="navigate" class="nolink"
					v-bind:data-route-name="route.name"
				>
					<Button type="default" small="true">Edit</Button>
				</a>
			</router-link>
		</div>
		
		<div class="component_row_button" v-else
		>
			<Button type="default" small="true" @click="onButtonClick('edit')">Edit</Button>
		</div>
		
		<div class="component_row_button">
			<Button type="danger" small="true" @click="onButtonClick('delete')">Delete</Button>
		</div>
	</div>
</template>


<script lang="js">

import Button from "./Button";
import { defineComponent } from 'vue';
import { mixin, componentExtend, deepClone } from 'vue-helper';
import { CrudEvent, CRUD_EVENTS } from "./CrudState";
import { Field } from './Field.vue';


export const RowButtons =
{
	name: "RowButtons",
	mixins: [ mixin ],
	emits: Field.emits,
	props: Field.props,
	computed:
	{
	},
	methods:
	{
		getItemId: function()
		{
			let id = this.crud.model.getItemId(this.crud.item);
			if (id == "") return "0";
			return id;
		},
		onButtonClick: function(button_name)
		{
			let event = new CrudEvent();
			event.event_name = CRUD_EVENTS.ROW_BUTTON_CLICK;
			event.crud_item = deepClone(this.crud.item);
			event.button_name = button_name;
			event.index = this.crud.index;
			this.$emit( "crudEvent", event );
		}
	},
	components:
	{
		Button,
	},
};

componentExtend(RowButtons, Field);
export default defineComponent(RowButtons);

</script>
