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
component_codemirror_textarea{
	display: none;
}
.component_codemirror .CodeMirror{
	min-height: 500px;
}
</style>


<template>
	<div class="component_codemirror">
		<textarea class="component_codemirror_textarea" ref="input"></textarea>
	</div>
</template>


<script lang="js">

import _CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import { defineComponent } from 'vue';
import { mixin, componentExtend } from 'vue-helper';
import { CrudEvent, CRUD_EVENTS } from "./CrudState";
import { Field } from './Field.vue';


export const CodeMirror =
{
	mixins: [ mixin ],
	emits: Field.emits,
	props: Field.props,
	computed:
	{
	},
	watch:
	{
		value(newVal)
		{
			if (this.instance_created && this.new_value != newVal)
			{
				this.new_value = newVal;
				setTimeout
				(
					() => { this.instance.getDoc().setValue(newVal); },
					10
				);
			}
		},
	},
	methods:
	{
		onChange: function()
		{
			this.change_timer = null;
			
			let value = this.instance.getDoc().getValue();
			if (this.instance_created && this.new_value != value)
			{
				this.new_value = value;
				let event = new CrudEvent();
				event.event_name = CRUD_EVENTS.ITEM_CHANGE;
				event.item_name = this.name;
				event.value = value;
				this.$emit( "crudEvent", event );
			}
		}
	},
	components:
	{
	},
	mounted: function()
	{
		this.instance = _CodeMirror.fromTextArea
		(
			this.$refs.input,
			{
				lineNumbers: true,
				lineWrapping: true,
				mode: "htmlmixed",
				matchBrackets: true,
				tabSize: 2,
			}
		);
		this.instance.refresh();
		this.instance_created = true;
		this.change_timer = null;
		this.new_value = "";
		
		/* Set min height */
		let min_height = this.crud.field.component_params["min-height"];
		if (min_height != undefined)
		{
			this.instance.display.wrapper.style.minHeight = min_height;
		}
		
		/* Set value */
		this.instance.getDoc().setValue(this.value);
		
		/* onChange */
		this.instance.on("change", (function(obj, onChange){ return (code) => {
			if (obj.change_timer == null)
			{
				obj.change_timer = setTimeout(onChange, 500);
			}
		}})(this, this.onChange.bind(this)));
		
		this.instance.setOption("extraKeys", {
			Tab: function(cm)
			{
				var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
				cm.replaceSelection(spaces);
			}
		});
	}
};

componentExtend(CodeMirror, Field);
export default defineComponent(CodeMirror);

</script>
