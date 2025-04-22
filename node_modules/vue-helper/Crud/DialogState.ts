/**
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
 */

import { AxiosResponse } from "axios";
import { BaseObject } from "vue-helper";

export class DialogButtonClickEvent
{
    action: string = "";
}

export class DialogButton extends BaseObject
{
    action: string = "";
    label: string = "";
    type: string = "";
    
    
    /**
	 * From object
	 */
	assignValues(params:Record<string, any>): DialogButton
	{
		this.action = String(params["action"] || this.action);
		this.label = String(params["label"] || this.label);
		this.type = String(params["type"] || this.type);
		super.assignValues(params);
		return this;
	}
	
	
	/**
	 * Returns values
	 */
	getValues(): Record<string, any>
	{
		return {
			"action": this.action,
			"label": this.label,
			"type": this.type,
		};
	}
}

export class DialogState extends BaseObject
{
    open: boolean = false;
    title: string = "";
    buttons: Array<DialogButton> = [];
    error_code: number = 0;
	message: string = "";
	
	
	
    /**
	 * Show dialog
	 */
	show()
	{
		this.open = true;
	}
    
    
    /**
	 * Hide dialog
	 */
	hide()
	{
		this.open = false;
	}
    
    
    /**
	 * From object
	 */
	assignValues(params:Record<string, any>): DialogState
	{
		this.open = Boolean(params["open"] || this.open);
		this.title = String(params["title"] || this.title);
		this.buttons = params["buttons"] || this.buttons;
		super.assignValues(params);
		return this;
	}
	
    
	
	/**
	 * Returns values
	 */
	getValues(): Record<string, any>
	{
		return {
			"open": this.open,
			"title": this.title,
			"buttons": this.buttons,
		};
	}
	
	
	
	/**
	 * Clear
	 */
	clear()
	{
		this.error_code = 0;
		this.message = "";
	}
	
	
	
	/**
	 * Set wait response
	 */
	setWaitResponse()
	{
		this.error_code = 0;
		this.message = "Please wait";
	}
	
	
	
	/**
	 * Set response
	 */
	setAxiosResponse(response: AxiosResponse | null)
	{
		if (response)
		{
			let data: any = response.data;
			if (typeof(data["error"]) == "object")
			{
				this.error_code = data["error"]["code"];
				this.message = data["error"]["str"];
			}
			else
			{
				this.error_code = -1;
				this.message = "System error";
			}
		}
		else
		{
			this.error_code = -1;
			this.message = "System error. Response is null";
		}
	}
	
}