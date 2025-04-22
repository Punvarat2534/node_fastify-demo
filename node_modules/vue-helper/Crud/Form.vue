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
.crud_form__row{
	padding-bottom: 15px;
}
.crud_form__row:last-child{
	padding-bottom: 0px;
}
.crud_form__row_label{
	font-weight: bold;
	padding-bottom: 5px;
}
.crud_form__buttons{
	text-align: center;
	margin-top: 10px;
}
.crud_form__buttons button{
	margin-left: 5px;
	margin-right: 5px;
}
.crud_form__result_message{
	padding-top: 10px;
	text-align: center;
}
.crud_form__result_message.success{
	color: green;
}
.crud_form__result_message.error{
	color: red;
}
</style>


<template>
	<div class="crud_form">
		
		<div v-if="model.load_error == false">
			<div class="crud_form__title">
				<slot name="title">{{ model.title }}</slot>
			</div>
			
			<div class="crud_form__rows">
				<slot name="rows">
					<div class="crud_form__row"
						v-for="field in model.fields" :key="field.api_name"
						v-bind:data-name="field.api_name"
					>
						<div class="crud_form__row_label">{{ field.label }}</div>
						<div class="crud_form__row_value">
							<component v-bind:is="field.component"
								v-bind:name="field.api_name"
								v-bind:crud="{
									item: model.item,
									field: field
								}"
								v-bind:value="model.getItemValue(field.api_name)"
								@crudEvent="onCrudEvent($event)"
							/>
						</div>
						<div class="crud_form__row_result"></div>
					</div>
				</slot>
			</div>
			
			<div class="crud_form__buttons">
				<slot name="buttons"></slot>
			</div>
			
			<div class="crud_form__result">
				<slot name="result">
					<div class="crud_form__result_message"
						v-bind:class="{
							error: model.error_code < 0,
							success: model.error_code > 0,
						}">{{ model.message }}</div>
				</slot>
			</div>
		</div>
		
		<div class="crud_form__error" v-if="model.load_error == true">
			Ошибка: {{ model.message }}
		</div>
		
	</div>
</template>


<script lang="js">

import { defineComponent } from 'vue';
import { mixin } from "vue-helper";
import { CRUD_EVENTS } from "./CrudState";
import axios from "axios";


export const Form =
{
	mixins: [ mixin ],
	props: [],
	computed:
	{
	},
	methods:
	{
		onCrudEvent: function($event)
		{
			if ($event.event_name == CRUD_EVENTS.ITEM_CHANGE)
			{
				this.model.setItemValue($event.item_name, $event.value)
			}
		},
	},
};

export default defineComponent(Form);

</script>
