var app = (function () {
	'use strict';

	function noop() {}

	function assign(tar, src) {
		for (var k in src) tar[k] = src[k];
		return tar;
	}

	function assignTrue(tar, src) {
		for (var k in src) tar[k] = 1;
		return tar;
	}

	function callAfter(fn, i) {
		if (i === 0) fn();
		return () => {
			if (!--i) fn();
		};
	}

	function addLoc(element, file, line, column, char) {
		element.__svelte_meta = {
			loc: { file, line, column, char }
		};
	}

	function run(fn) {
		fn();
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function destroyEach(iterations, detach) {
		for (var i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d(detach);
		}
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function createSvgElement(name) {
		return document.createElementNS('http://www.w3.org/2000/svg', name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function createComment() {
		return document.createComment('');
	}

	function addListener(node, event, handler) {
		node.addEventListener(event, handler, false);
	}

	function removeListener(node, event, handler) {
		node.removeEventListener(event, handler, false);
	}

	function setAttribute(node, attribute, value) {
		node.setAttribute(attribute, value);
	}

	function setXlinkAttribute(node, attribute, value) {
		node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
	}

	function setData(text, data) {
		text.data = '' + data;
	}

	function setStyle(node, key, value) {
		node.style.setProperty(key, value);
	}

	function blankObject() {
		return Object.create(null);
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function destroyDev(detach) {
		destroy.call(this, detach);
		this.destroy = function() {
			console.warn('Component was already destroyed');
		};
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function flush(component) {
		component._lock = true;
		callAll(component._beforecreate);
		callAll(component._oncreate);
		callAll(component._aftercreate);
		component._lock = false;
	}

	function get() {
		return this._state;
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._slots = blankObject();
		component._bind = options._bind;
		component._staged = {};

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;

		if (!options.root) {
			component._beforecreate = [];
			component._oncreate = [];
			component._aftercreate = [];
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		flush(this.root);
	}

	function _set(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		newState = assign(this._staged, newState);
		this._staged = {};

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _stage(newState) {
		assign(this._staged, newState);
	}

	function setDev(newState) {
		if (typeof newState !== 'object') {
			throw new Error(
				this._debugName + '.set was called without an object of data key-values to update.'
			);
		}

		this._checkReadOnly(newState);
		set.call(this, newState);
	}

	function callAll(fns) {
		while (fns && fns.length) fns.shift()();
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	var protoDev = {
		destroy: destroyDev,
		get,
		fire,
		on,
		set: setDev,
		_recompute: noop,
		_set,
		_stage,
		_mount,
		_differs
	};

	/* src\LegendIconCell.html generated by Svelte v2.13.4 */

	function backgroundColor({ item }) {
		return L.gmxUtil.dec2rgba(item.RenderStyle.fillColor, item.RenderStyle.fillOpacity || 1);
	}

	function borderColor({ item }) {
		return L.gmxUtil.dec2rgba(item.RenderStyle.color, item.RenderStyle.opacity || 1);
	}

	function data() {
		return {
		}
	}
	function onstate({ changed, current, previous }) {
	 // console.log('LegendIconCell in onstate', changed, current, previous);
	}
	const file = "src\\LegendIconCell.html";

	function create_main_fragment(component, ctx) {
		var span, current;

		function select_block_type(ctx) {
			if (ctx.item.RenderStyle.iconUrl) return create_if_block;
			return create_if_block_1;
		}

		var current_block_type = select_block_type(ctx);
		var if_block = current_block_type(component, ctx);

		return {
			c: function create() {
				span = createElement("span");
				if_block.c();
				span.className = "legendIconCell style";
				addLoc(span, file, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, span, anchor);
				if_block.m(span, null);
				current = true;
			},

			p: function update(changed, ctx) {
				if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
					if_block.p(changed, ctx);
				} else {
					if_block.d(1);
					if_block = current_block_type(component, ctx);
					if_block.c();
					if_block.m(span, null);
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(span);
				}

				if_block.d();
			}
		};
	}

	// (2:0) {#if item.RenderStyle.iconUrl}
	function create_if_block(component, ctx) {
		var img, img_src_value;

		return {
			c: function create() {
				img = createElement("img");
				img.src = img_src_value = ctx.item.RenderStyle.iconUrl;
				setAttribute(img, "crossorigin", "");
				img.alt = "Style Icon";
				addLoc(img, file, 2, 1, 70);
			},

			m: function mount(target, anchor) {
				insert(target, img, anchor);
			},

			p: function update(changed, ctx) {
				if ((changed.item) && img_src_value !== (img_src_value = ctx.item.RenderStyle.iconUrl)) {
					img.src = img_src_value;
				}
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(img);
				}
			}
		};
	}

	// (4:0) {:else}
	function create_if_block_1(component, ctx) {
		var span, span_class_value;

		return {
			c: function create() {
				span = createElement("span");
				span.className = span_class_value = "" + ctx.type + " legendIconStyle " + " svelte-cb4pok";
				setStyle(span, "background-color", ctx.backgroundColor);
				setStyle(span, "border-color", ctx.borderColor);
				addLoc(span, file, 4, 1, 154);
			},

			m: function mount(target, anchor) {
				insert(target, span, anchor);
			},

			p: function update(changed, ctx) {
				if ((changed.type) && span_class_value !== (span_class_value = "" + ctx.type + " legendIconStyle " + " svelte-cb4pok")) {
					span.className = span_class_value;
				}

				if (changed.backgroundColor) {
					setStyle(span, "background-color", ctx.backgroundColor);
				}

				if (changed.borderColor) {
					setStyle(span, "border-color", ctx.borderColor);
				}
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(span);
				}
			}
		};
	}

	function LegendIconCell(options) {
		this._debugName = '<LegendIconCell>';
		if (!options || (!options.target && !options.root)) throw new Error("'target' is a required option");
		init(this, options);
		this._state = assign(data(), options.data);
		this._recompute({ item: 1 }, this._state);
		if (!('item' in this._state)) console.warn("<LegendIconCell> was created without expected data property 'item'");
		if (!('type' in this._state)) console.warn("<LegendIconCell> was created without expected data property 'type'");
		this._intro = !!options.intro;

		this._handlers.state = [onstate];

		onstate.call(this, { changed: assignTrue({}, this._state), current: this._state });

		this._fragment = create_main_fragment(this, this._state);

		this.root._oncreate.push(() => {
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(LegendIconCell.prototype, protoDev);

	LegendIconCell.prototype._checkReadOnly = function _checkReadOnly(newState) {
		if ('backgroundColor' in newState && !this._updatingReadonlyProperty) throw new Error("<LegendIconCell>: Cannot set read-only property 'backgroundColor'");
		if ('borderColor' in newState && !this._updatingReadonlyProperty) throw new Error("<LegendIconCell>: Cannot set read-only property 'borderColor'");
	};

	LegendIconCell.prototype._recompute = function _recompute(changed, state) {
		if (changed.item) {
			if (this._differs(state.backgroundColor, (state.backgroundColor = backgroundColor(state)))) changed.backgroundColor = true;
			if (this._differs(state.borderColor, (state.borderColor = borderColor(state)))) changed.borderColor = true;
		}
	};

	/* src\LineNode.html generated by Svelte v2.13.4 */

	function properties({ line }) {
		return line.content.properties;
	}

	function nodeID({ properties }) {
		return properties ? properties.name || properties.GroupID : 'root';
	}

	function styles({ properties }) {
		return properties.gmxStyles ? properties.gmxStyles.styles : [];
	}

	function data$1() {
		return {
			line: null
		}
	}
	var methods = {
		toggleVisibility(target) {
			let {line} = this.get(),
				node = line.type === 'group' ? target.parentNode.parentNode.getElementsByClassName('expanderInput')[0] : target.parentNode.getElementsByClassName('cmd:toggleVisibility')[0];
			// console.log('toggleVisibility', node, line);
			if (node) {
				if (node.checked) {
					node.checked = false;
				} else {
					node.checked = true;
				}
			}
		},
		showInfo(target) {
			let node = target.parentNode.nextElementSibling.getElementsByClassName('description')[0];
			if (node) {
				if (node.classList.contains('collapse')) {
					let {line} = this.get();
					node.innerHTML = line.content.properties.description || '';
					node.classList.remove('collapse');
				} else {
					node.classList.add('collapse');
				}
			}
		}
	};

	const file$1 = "src\\LineNode.html";

	function create_main_fragment$1(component, ctx) {
		var li, text, li_class_value, current;

		var if_block = (ctx.properties) && create_if_block$1(component, ctx);

		var if_block_1 = (ctx.line.content.children) && create_if_block_10(component, ctx);

		return {
			c: function create() {
				li = createElement("li");
				if (if_block) if_block.c();
				text = createText("\r\n");
				if (if_block_1) if_block_1.c();
				li.className = li_class_value = "line cmd:toggleIcons id:" + ctx.nodeID + " svelte-nr7la9";
				addLoc(li, file$1, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, li, anchor);
				if (if_block) if_block.m(li, null);
				append(li, text);
				if (if_block_1) if_block_1.m(li, null);
				current = true;
			},

			p: function update(changed, ctx) {
				if (ctx.properties) {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block$1(component, ctx);
						if (if_block) if_block.c();
					}

					if_block.i(li, text);
				} else if (if_block) {
					if_block.o(function() {
						if_block.d(1);
						if_block = null;
					});
				}

				if (ctx.line.content.children) {
					if (if_block_1) {
						if_block_1.p(changed, ctx);
					} else {
						if_block_1 = create_if_block_10(component, ctx);
						if (if_block_1) if_block_1.c();
					}

					if_block_1.i(li, null);
				} else if (if_block_1) {
					if_block_1.o(function() {
						if_block_1.d(1);
						if_block_1 = null;
					});
				}

				if ((!current || changed.nodeID) && li_class_value !== (li_class_value = "line cmd:toggleIcons id:" + ctx.nodeID + " svelte-nr7la9")) {
					li.className = li_class_value;
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				outrocallback = callAfter(outrocallback, 2);

				if (if_block) if_block.o(outrocallback);
				else outrocallback();

				if (if_block_1) if_block_1.o(outrocallback);
				else outrocallback();

				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(li);
				}

				if (if_block) if_block.d();
				if (if_block_1) if_block_1.d();
			}
		};
	}

	// (8:3) {#if properties.styles.length > 1}
	function create_if_block_3(component, ctx) {
		var span, svg, use;

		return {
			c: function create() {
				span = createElement("span");
				svg = createSvgElement("svg");
				use = createSvgElement("use");
				setXlinkAttribute(use, "xlink:href", "#overlays");
				setAttribute(use, "href", "#overlays");
				addLoc(use, file$1, 8, 61, 582);
				setAttribute(svg, "role", "img");
				setAttribute(svg, "class", "svgIcon svelte-nr7la9");
				addLoc(svg, file$1, 8, 29, 550);
				span.className = "cont-overlays svelte-nr7la9";
				addLoc(span, file$1, 8, 1, 522);
			},

			m: function mount(target, anchor) {
				insert(target, span, anchor);
				append(span, svg);
				append(svg, use);
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(span);
				}
			}
		};
	}

	// (13:3) {#if properties.description}
	function create_if_block_4(component, ctx) {
		var span, svg, use;

		function click_handler(event) {
			component.showInfo(this, event);
		}

		return {
			c: function create() {
				span = createElement("span");
				svg = createSvgElement("svg");
				use = createSvgElement("use");
				setXlinkAttribute(use, "xlink:href", "#info-circle-i");
				setAttribute(use, "href", "#info-circle-i");
				addLoc(use, file$1, 13, 137, 1047);
				setAttribute(svg, "role", "img");
				setAttribute(svg, "class", "svgIcon svelte-nr7la9");
				addLoc(svg, file$1, 13, 105, 1015);
				addListener(span, "click", click_handler);
				span.className = "pointer cmd:showInfo cont-info svelte-nr7la9";
				span.title = "View description";
				addLoc(span, file$1, 13, 2, 912);
			},

			m: function mount(target, anchor) {
				insert(target, span, anchor);
				append(span, svg);
				append(svg, use);
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(span);
				}

				removeListener(span, "click", click_handler);
			}
		};
	}

	// (7:2) {#if line.type === 'layer'}
	function create_if_block_2(component, ctx) {
		var text, span, span_1, svg, use, text_1;

		var if_block = (ctx.properties.styles.length > 1) && create_if_block_3(component, ctx);

		var if_block_1 = (ctx.properties.description) && create_if_block_4(component, ctx);

		return {
			c: function create() {
				if (if_block) if_block.c();
				text = createText("\r\n\t");
				span = createElement("span");
				span_1 = createElement("span");
				svg = createSvgElement("svg");
				use = createSvgElement("use");
				text_1 = createText("\r\n\t\t\t");
				if (if_block_1) if_block_1.c();
				setXlinkAttribute(use, "xlink:href", "#center-on-click");
				setAttribute(use, "href", "#center-on-click");
				addLoc(use, file$1, 11, 115, 797);
				setAttribute(svg, "role", "img");
				setAttribute(svg, "class", "svgIcon svelte-nr7la9");
				addLoc(svg, file$1, 11, 83, 765);
				span_1.className = "pointer cmd:fitBounds cont-center svelte-nr7la9";
				span_1.title = "Move map to this layer";
				addLoc(span_1, file$1, 11, 3, 685);
				span.className = "icons  svelte-nr7la9";
				addLoc(span, file$1, 10, 1, 659);
			},

			m: function mount(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insert(target, text, anchor);
				insert(target, span, anchor);
				append(span, span_1);
				append(span_1, svg);
				append(svg, use);
				append(span, text_1);
				if (if_block_1) if_block_1.m(span, null);
			},

			p: function update(changed, ctx) {
				if (ctx.properties.styles.length > 1) {
					if (!if_block) {
						if_block = create_if_block_3(component, ctx);
						if_block.c();
						if_block.m(text.parentNode, text);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}

				if (ctx.properties.description) {
					if (!if_block_1) {
						if_block_1 = create_if_block_4(component, ctx);
						if_block_1.c();
						if_block_1.m(span, null);
					}
				} else if (if_block_1) {
					if_block_1.d(1);
					if_block_1 = null;
				}
			},

			d: function destroy$$1(detach) {
				if (if_block) if_block.d(detach);
				if (detach) {
					detachNode(text);
					detachNode(span);
				}

				if (if_block_1) if_block_1.d();
			}
		};
	}

	// (3:1) {#if line.type !== 'map'}
	function create_if_block_1$1(component, ctx) {
		var div, text, input, input_checked_value, text_1, span, svg, use, span_class_value, text_2, if_block_anchor;

		var if_block = (ctx.line.type === 'layer') && create_if_block_2(component, ctx);

		return {
			c: function create() {
				div = createElement("div");
				text = createText("\r\n\t");
				input = createElement("input");
				text_1 = createText("\r\n\t");
				span = createElement("span");
				svg = createSvgElement("svg");
				use = createSvgElement("use");
				text_2 = createText("\r\n\t\t");
				if (if_block) if_block.c();
				if_block_anchor = createComment();
				div.className = "borders ";
				addLoc(div, file$1, 3, 1, 94);
				input.className = "expander expanderInput hidden svelte-nr7la9";
				setAttribute(input, "type", "checkbox");
				input.checked = input_checked_value = ctx.properties.expanded ? true : false;
				addLoc(input, file$1, 4, 1, 125);
				setXlinkAttribute(use, "xlink:href", "#arrow-small-down");
				setAttribute(use, "href", "#arrow-small-down");
				addLoc(use, file$1, 5, 134, 369);
				setAttribute(svg, "role", "img");
				setAttribute(svg, "class", "svgIcon svelte-nr7la9");
				addLoc(svg, file$1, 5, 102, 337);
				span.className = span_class_value = "expander pointer cmd:toggleFolder expanderCont " + (ctx.line.content.children ? '' : 'hidden') + " svelte-nr7la9";
				addLoc(span, file$1, 5, 1, 236);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);
				insert(target, text, anchor);
				insert(target, input, anchor);
				insert(target, text_1, anchor);
				insert(target, span, anchor);
				append(span, svg);
				append(svg, use);
				insert(target, text_2, anchor);
				if (if_block) if_block.m(target, anchor);
				insert(target, if_block_anchor, anchor);
			},

			p: function update(changed, ctx) {
				if ((changed.properties) && input_checked_value !== (input_checked_value = ctx.properties.expanded ? true : false)) {
					input.checked = input_checked_value;
				}

				if ((changed.line) && span_class_value !== (span_class_value = "expander pointer cmd:toggleFolder expanderCont " + (ctx.line.content.children ? '' : 'hidden') + " svelte-nr7la9")) {
					span.className = span_class_value;
				}

				if (ctx.line.type === 'layer') {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block_2(component, ctx);
						if_block.c();
						if_block.m(if_block_anchor.parentNode, if_block_anchor);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div);
					detachNode(text);
					detachNode(input);
					detachNode(text_1);
					detachNode(span);
					detachNode(text_2);
				}

				if (if_block) if_block.d(detach);
				if (detach) {
					detachNode(if_block_anchor);
				}
			}
		};
	}

	// (24:2) {#if styles.length && styles.length < 2 && styles[0].RenderStyle}
	function create_if_block_7(component, ctx) {
		var current;

		var legendiconcell_initial_data = { item: ctx.styles[0], type: ctx.properties.GeometryType };
		var legendiconcell = new LegendIconCell({
			root: component.root,
			store: component.store,
			data: legendiconcell_initial_data
		});

		return {
			c: function create() {
				legendiconcell._fragment.c();
			},

			m: function mount(target, anchor) {
				legendiconcell._mount(target, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				var legendiconcell_changes = {};
				if (changed.styles) legendiconcell_changes.item = ctx.styles[0];
				if (changed.properties) legendiconcell_changes.type = ctx.properties.GeometryType;
				legendiconcell._set(legendiconcell_changes);
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (legendiconcell) legendiconcell._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				legendiconcell.destroy(detach);
			}
		};
	}

	// (21:2) {#if line.type === 'layer'}
	function create_if_block_6(component, ctx) {
		var input, input_checked_value, text, span, current;

		var if_block = (ctx.styles.length && ctx.styles.length < 2 && ctx.styles[0].RenderStyle) && create_if_block_7(component, ctx);

		return {
			c: function create() {
				input = createElement("input");
				text = createText("\r\n\t\t");
				span = createElement("span");
				if (if_block) if_block.c();
				input.className = "check visibility pointer cmd:toggleVisibility svelte-nr7la9";
				setAttribute(input, "type", "checkbox");
				input.checked = input_checked_value = ctx.layersTree && ctx.layersTree.visible[ctx.nodeID] ? true : false;
				addLoc(input, file$1, 21, 2, 1244);
				span.className = "styleIcon gmx-style-legend svelte-nr7la9";
				addLoc(span, file$1, 22, 2, 1393);
			},

			m: function mount(target, anchor) {
				insert(target, input, anchor);
				insert(target, text, anchor);
				insert(target, span, anchor);
				if (if_block) if_block.m(span, null);
				current = true;
			},

			p: function update(changed, ctx) {
				if ((!current || changed.layersTree || changed.nodeID) && input_checked_value !== (input_checked_value = ctx.layersTree && ctx.layersTree.visible[ctx.nodeID] ? true : false)) {
					input.checked = input_checked_value;
				}

				if (ctx.styles.length && ctx.styles.length < 2 && ctx.styles[0].RenderStyle) {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block_7(component, ctx);
						if (if_block) if_block.c();
					}

					if_block.i(span, null);
				} else if (if_block) {
					if_block.o(function() {
						if_block.d(1);
						if_block = null;
					});
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (if_block) if_block.o(outrocallback);
				else outrocallback();

				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(input);
					detachNode(text);
					detachNode(span);
				}

				if (if_block) if_block.d();
			}
		};
	}

	// (34:3) {#each styles as it}
	function create_each_block(component, ctx) {
		var div, span, svg, use, text, svg_1, use_1, text_2, text_3, span_1, span_2, text_4_value = ctx.it.Name, text_4, current;

		var legendiconcell_initial_data = { item: ctx.it, type: ctx.properties.GeometryType };
		var legendiconcell = new LegendIconCell({
			root: component.root,
			store: component.store,
			data: legendiconcell_initial_data
		});

		return {
			c: function create() {
				div = createElement("div");
				span = createElement("span");
				svg = createSvgElement("svg");
				use = createSvgElement("use");
				text = createText("\r\n\t\t\t\t\t\t");
				svg_1 = createSvgElement("svg");
				use_1 = createSvgElement("use");
				text_2 = createText("\r\n\t\t\t\t\t");
				legendiconcell._fragment.c();
				text_3 = createText("\r\n\t\t\t\t\t");
				span_1 = createElement("span");
				span_2 = createElement("span");
				text_4 = createText(text_4_value);
				setXlinkAttribute(use, "xlink:href", "#eye-on");
				setAttribute(use, "href", "#eye-on");
				addLoc(use, file$1, 36, 41, 2064);
				setAttribute(svg, "role", "img");
				setAttribute(svg, "class", "svgIcon on svelte-nr7la9");
				addLoc(svg, file$1, 36, 6, 2029);
				setXlinkAttribute(use_1, "xlink:href", "#eye-off");
				setAttribute(use_1, "href", "#eye-off");
				addLoc(use_1, file$1, 37, 42, 2161);
				setAttribute(svg_1, "role", "img");
				setAttribute(svg_1, "class", "svgIcon off svelte-nr7la9");
				addLoc(svg_1, file$1, 37, 6, 2125);
				span.className = "legendIconEye enabled pointer cmd:toggleStyle svelte-nr7la9";
				addLoc(span, file$1, 35, 5, 1961);
				span_2.className = "styleName";
				addLoc(span_2, file$1, 40, 34, 2332);
				span_1.className = "legendIconCell svelte-nr7la9";
				addLoc(span_1, file$1, 40, 5, 2303);
				div.className = "gmx-style-legend svelte-nr7la9";
				addLoc(div, file$1, 34, 4, 1924);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);
				append(div, span);
				append(span, svg);
				append(svg, use);
				append(span, text);
				append(span, svg_1);
				append(svg_1, use_1);
				append(div, text_2);
				legendiconcell._mount(div, null);
				append(div, text_3);
				append(div, span_1);
				append(span_1, span_2);
				append(span_2, text_4);
				current = true;
			},

			p: function update(changed, ctx) {
				var legendiconcell_changes = {};
				if (changed.styles) legendiconcell_changes.item = ctx.it;
				if (changed.properties) legendiconcell_changes.type = ctx.properties.GeometryType;
				legendiconcell._set(legendiconcell_changes);

				if ((!current || changed.styles) && text_4_value !== (text_4_value = ctx.it.Name)) {
					setData(text_4, text_4_value);
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (legendiconcell) legendiconcell._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div);
				}

				legendiconcell.destroy();
			}
		};
	}

	// (33:3) {#if styles.length && styles.length > 1 && styles[0].RenderStyle}
	function create_if_block_9(component, ctx) {
		var each_anchor, current;

		var each_value = ctx.styles;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(component, get_each_context(ctx, each_value, i));
		}

		function outroBlock(i, detach, fn) {
			if (each_blocks[i]) {
				each_blocks[i].o(() => {
					if (detach) {
						each_blocks[i].d(detach);
						each_blocks[i] = null;
					}
					if (fn) fn();
				});
			}
		}

		return {
			c: function create() {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_anchor = createComment();
			},

			m: function mount(target, anchor) {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].i(target, anchor);
				}

				insert(target, each_anchor, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				if (changed.styles || changed.properties) {
					each_value = ctx.styles;

					for (var i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block(component, child_ctx);
							each_blocks[i].c();
						}
						each_blocks[i].i(each_anchor.parentNode, each_anchor);
					}
					for (; i < each_blocks.length; i += 1) outroBlock(i, 1);
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				each_blocks = each_blocks.filter(Boolean);
				const countdown = callAfter(outrocallback, each_blocks.length);
				for (let i = 0; i < each_blocks.length; i += 1) outroBlock(i, 0, countdown);

				current = false;
			},

			d: function destroy$$1(detach) {
				destroyEach(each_blocks, detach);

				if (detach) {
					detachNode(each_anchor);
				}
			}
		};
	}

	// (31:2) {#if line.type === 'layer'}
	function create_if_block_8(component, ctx) {
		var div, current;

		var if_block = (ctx.styles.length && ctx.styles.length > 1 && ctx.styles[0].RenderStyle) && create_if_block_9(component, ctx);

		return {
			c: function create() {
				div = createElement("div");
				if (if_block) if_block.c();
				div.className = "legend svelte-nr7la9";
				addLoc(div, file$1, 31, 2, 1803);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);
				if (if_block) if_block.m(div, null);
				current = true;
			},

			p: function update(changed, ctx) {
				if (ctx.styles.length && ctx.styles.length > 1 && ctx.styles[0].RenderStyle) {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block_9(component, ctx);
						if (if_block) if_block.c();
					}

					if_block.i(div, null);
				} else if (if_block) {
					if_block.o(function() {
						if_block.d(1);
						if_block = null;
					});
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (if_block) if_block.o(outrocallback);
				else outrocallback();

				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div);
				}

				if (if_block) if_block.d();
			}
		};
	}

	// (19:2) {#if line.type !== 'map'}
	function create_if_block_5(component, ctx) {
		var span, text, label, text_1_value = ctx.properties.title, text_1, text_2, div, text_3, current;

		var if_block = (ctx.line.type === 'layer') && create_if_block_6(component, ctx);

		function click_handler(event) {
			component.toggleVisibility(this, event);
		}

		var if_block_1 = (ctx.line.type === 'layer') && create_if_block_8(component, ctx);

		return {
			c: function create() {
				span = createElement("span");
				if (if_block) if_block.c();
				text = createText("\r\n\t\t");
				label = createElement("label");
				text_1 = createText(text_1_value);
				text_2 = createText("\r\n\t\t");
				div = createElement("div");
				text_3 = createText("\r\n\t\t");
				if (if_block_1) if_block_1.c();
				addListener(label, "click", click_handler);
				label.className = "pointer title cmd:toggleVisibility svelte-nr7la9";
				addLoc(label, file$1, 28, 2, 1607);
				div.className = "description collapse svelte-nr7la9";
				addLoc(div, file$1, 29, 2, 1728);
				span.className = "cont";
				addLoc(span, file$1, 19, 1, 1190);
			},

			m: function mount(target, anchor) {
				insert(target, span, anchor);
				if (if_block) if_block.m(span, null);
				append(span, text);
				append(span, label);
				append(label, text_1);
				append(span, text_2);
				append(span, div);
				append(span, text_3);
				if (if_block_1) if_block_1.m(span, null);
				current = true;
			},

			p: function update(changed, ctx) {
				if (ctx.line.type === 'layer') {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block_6(component, ctx);
						if (if_block) if_block.c();
					}

					if_block.i(span, text);
				} else if (if_block) {
					if_block.o(function() {
						if_block.d(1);
						if_block = null;
					});
				}

				if ((!current || changed.properties) && text_1_value !== (text_1_value = ctx.properties.title)) {
					setData(text_1, text_1_value);
				}

				if (ctx.line.type === 'layer') {
					if (if_block_1) {
						if_block_1.p(changed, ctx);
					} else {
						if_block_1 = create_if_block_8(component, ctx);
						if (if_block_1) if_block_1.c();
					}

					if_block_1.i(span, null);
				} else if (if_block_1) {
					if_block_1.o(function() {
						if_block_1.d(1);
						if_block_1 = null;
					});
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				outrocallback = callAfter(outrocallback, 2);

				if (if_block) if_block.o(outrocallback);
				else outrocallback();

				if (if_block_1) if_block_1.o(outrocallback);
				else outrocallback();

				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(span);
				}

				if (if_block) if_block.d();
				removeListener(label, "click", click_handler);
				if (if_block_1) if_block_1.d();
			}
		};
	}

	// (2:0) {#if properties}
	function create_if_block$1(component, ctx) {
		var text, if_block_1_anchor, current;

		var if_block = (ctx.line.type !== 'map') && create_if_block_1$1(component, ctx);

		var if_block_1 = (ctx.line.type !== 'map') && create_if_block_5(component, ctx);

		return {
			c: function create() {
				if (if_block) if_block.c();
				text = createText("\r\n\t\t");
				if (if_block_1) if_block_1.c();
				if_block_1_anchor = createComment();
			},

			m: function mount(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insert(target, text, anchor);
				if (if_block_1) if_block_1.m(target, anchor);
				insert(target, if_block_1_anchor, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				if (ctx.line.type !== 'map') {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block_1$1(component, ctx);
						if_block.c();
						if_block.m(text.parentNode, text);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}

				if (ctx.line.type !== 'map') {
					if (if_block_1) {
						if_block_1.p(changed, ctx);
					} else {
						if_block_1 = create_if_block_5(component, ctx);
						if (if_block_1) if_block_1.c();
					}

					if_block_1.i(if_block_1_anchor.parentNode, if_block_1_anchor);
				} else if (if_block_1) {
					if_block_1.o(function() {
						if_block_1.d(1);
						if_block_1 = null;
					});
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (if_block_1) if_block_1.o(outrocallback);
				else outrocallback();

				current = false;
			},

			d: function destroy$$1(detach) {
				if (if_block) if_block.d(detach);
				if (detach) {
					detachNode(text);
				}

				if (if_block_1) if_block_1.d(detach);
				if (detach) {
					detachNode(if_block_1_anchor);
				}
			}
		};
	}

	// (52:1) {#each line.content.children || [] as child}
	function create_each_block_1(component, ctx) {
		var linenode_updating = {}, current;

		var linenode_initial_data = { line: ctx.child };
		if (ctx.layersTree  !== void 0) {
			linenode_initial_data.layersTree = ctx.layersTree ;
			linenode_updating.layersTree = true;
		}
		var linenode = new LineNode({
			root: component.root,
			store: component.store,
			data: linenode_initial_data,
			_bind(changed, childState) {
				var newState = {};
				if (!linenode_updating.layersTree && changed.layersTree) {
					newState.layersTree = childState.layersTree;
				}
				component._set(newState);
				linenode_updating = {};
			}
		});

		component.root._beforecreate.push(() => {
			linenode._bind({ layersTree: 1 }, linenode.get());
		});

		return {
			c: function create() {
				linenode._fragment.c();
			},

			m: function mount(target, anchor) {
				linenode._mount(target, anchor);
				current = true;
			},

			p: function update(changed, _ctx) {
				ctx = _ctx;
				var linenode_changes = {};
				if (changed.line) linenode_changes.line = ctx.child;
				if (!linenode_updating.layersTree && changed.layersTree) {
					linenode_changes.layersTree = ctx.layersTree ;
					linenode_updating.layersTree = ctx.layersTree  !== void 0;
				}
				linenode._set(linenode_changes);
				linenode_updating = {};
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (linenode) linenode._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				linenode.destroy(detach);
			}
		};
	}

	// (50:0) {#if line.content.children}
	function create_if_block_10(component, ctx) {
		var ul, ul_class_value, current;

		var each_value_1 = ctx.line.content.children || [];

		var each_blocks = [];

		for (var i = 0; i < each_value_1.length; i += 1) {
			each_blocks[i] = create_each_block_1(component, get_each_context_1(ctx, each_value_1, i));
		}

		function outroBlock(i, detach, fn) {
			if (each_blocks[i]) {
				each_blocks[i].o(() => {
					if (detach) {
						each_blocks[i].d(detach);
						each_blocks[i] = null;
					}
					if (fn) fn();
				});
			}
		}

		return {
			c: function create() {
				ul = createElement("ul");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}
				ul.className = ul_class_value = "group css-treeview id_" + (ctx.properties ? ctx.properties.name : 'root') + " svelte-nr7la9";
				addLoc(ul, file$1, 50, 1, 2490);
			},

			m: function mount(target, anchor) {
				insert(target, ul, anchor);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].i(ul, null);
				}

				current = true;
			},

			p: function update(changed, ctx) {
				if (changed.line || changed.layersTree) {
					each_value_1 = ctx.line.content.children || [];

					for (var i = 0; i < each_value_1.length; i += 1) {
						const child_ctx = get_each_context_1(ctx, each_value_1, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block_1(component, child_ctx);
							each_blocks[i].c();
						}
						each_blocks[i].i(ul, null);
					}
					for (; i < each_blocks.length; i += 1) outroBlock(i, 1);
				}

				if ((!current || changed.properties) && ul_class_value !== (ul_class_value = "group css-treeview id_" + (ctx.properties ? ctx.properties.name : 'root') + " svelte-nr7la9")) {
					ul.className = ul_class_value;
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				each_blocks = each_blocks.filter(Boolean);
				const countdown = callAfter(outrocallback, each_blocks.length);
				for (let i = 0; i < each_blocks.length; i += 1) outroBlock(i, 0, countdown);

				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(ul);
				}

				destroyEach(each_blocks, detach);
			}
		};
	}

	function get_each_context(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.it = list[i];
		child_ctx.each_value = list;
		child_ctx.it_index = i;
		return child_ctx;
	}

	function get_each_context_1(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.child = list[i];
		child_ctx.each_value_1 = list;
		child_ctx.child_index = i;
		return child_ctx;
	}

	function LineNode(options) {
		this._debugName = '<LineNode>';
		if (!options || (!options.target && !options.root)) throw new Error("'target' is a required option");
		init(this, options);
		this._state = assign(data$1(), options.data);
		this._recompute({ line: 1, properties: 1 }, this._state);
		if (!('line' in this._state)) console.warn("<LineNode> was created without expected data property 'line'");


		if (!('layersTree' in this._state)) console.warn("<LineNode> was created without expected data property 'layersTree'");
		this._intro = !!options.intro;

		this._fragment = create_main_fragment$1(this, this._state);

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(LineNode.prototype, protoDev);
	assign(LineNode.prototype, methods);

	LineNode.prototype._checkReadOnly = function _checkReadOnly(newState) {
		if ('properties' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'properties'");
		if ('nodeID' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'nodeID'");
		if ('styles' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'styles'");
	};

	LineNode.prototype._recompute = function _recompute(changed, state) {
		if (changed.line) {
			if (this._differs(state.properties, (state.properties = properties(state)))) changed.properties = true;
		}

		if (changed.properties) {
			if (this._differs(state.nodeID, (state.nodeID = nodeID(state)))) changed.nodeID = true;
			if (this._differs(state.styles, (state.styles = styles(state)))) changed.styles = true;
		}
	};

	/* src\TreeView.html generated by Svelte v2.13.4 */

	let regs = {
		cmd: /cmd:(\w+)/,
		id: /id:(\w+)/
	};
	function data$2() {
		return {
			config: {},
			layersTree: {},
			group: null,
			rawTree: null
		}
	}
	var methods$1 = {
		chkEvent(ev) {
			let target = ev.target,
				className = target.className,
				arr = regs.cmd.exec(className);

			if (arr && arr.length === 2) {
				let out = {
					cmd: arr[1],
					type: ev.type,
					originalEvent: ev
				};
				for(let i = 0; i < 5; i++) {
					if (target.classList.contains('line')) {
						arr = regs.id.exec(target.className);
						if (arr && arr.length === 2) {
							out.id = arr[1];
						}
						break;
					}
					target = target.parentNode;
				}
				if (out.id) {
					this.treeCommands(out);
					this.fire('command', out);
				}
			}
		},

		treeCommands(attr) {
			let {layersTree, rawTree} = this.get();
			// console.log('treeCommands', attr, layersTree, rawTree);

			if (attr.cmd === 'toggleFolder') {
				let expanded = layersTree.expanded || {},
					input = attr.originalEvent.target.previousElementSibling,
					id = attr.id;
				if (expanded[id]) {
					delete expanded[id];
					input.checked = false;
				} else {
					expanded[id] = true;
					input.checked = true;
				}
				this.set({layersTree: layersTree});
				return true;
			} else if (attr.cmd === 'showInfo') {
				let input = attr.originalEvent.target,
					id = attr.id;
			}
			return false;
		},
	};

	const file$2 = "src\\TreeView.html";

	function create_main_fragment$2(component, ctx) {
		var div, linenode_updating = {}, current;

		var linenode_initial_data = { line: ctx.rawTree };
		if (ctx.layersTree  !== void 0) {
			linenode_initial_data.layersTree = ctx.layersTree ;
			linenode_updating.layersTree = true;
		}
		var linenode = new LineNode({
			root: component.root,
			store: component.store,
			data: linenode_initial_data,
			_bind(changed, childState) {
				var newState = {};
				if (!linenode_updating.layersTree && changed.layersTree) {
					newState.layersTree = childState.layersTree;
				}
				component._set(newState);
				linenode_updating = {};
			}
		});

		component.root._beforecreate.push(() => {
			linenode._bind({ layersTree: 1 }, linenode.get());
		});

		function click_handler(event) {
			component.chkEvent(event);
		}

		return {
			c: function create() {
				div = createElement("div");
				linenode._fragment.c();
				addListener(div, "click", click_handler);
				div.className = "TreeView";
				addLoc(div, file$2, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);
				linenode._mount(div, null);
				current = true;
			},

			p: function update(changed, _ctx) {
				ctx = _ctx;
				var linenode_changes = {};
				if (changed.rawTree) linenode_changes.line = ctx.rawTree;
				if (!linenode_updating.layersTree && changed.layersTree) {
					linenode_changes.layersTree = ctx.layersTree ;
					linenode_updating.layersTree = ctx.layersTree  !== void 0;
				}
				linenode._set(linenode_changes);
				linenode_updating = {};
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (linenode) linenode._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div);
				}

				linenode.destroy();
				removeListener(div, "click", click_handler);
			}
		};
	}

	function TreeView(options) {
		this._debugName = '<TreeView>';
		if (!options || (!options.target && !options.root)) throw new Error("'target' is a required option");
		init(this, options);
		this._state = assign(data$2(), options.data);
		if (!('rawTree' in this._state)) console.warn("<TreeView> was created without expected data property 'rawTree'");
		if (!('layersTree' in this._state)) console.warn("<TreeView> was created without expected data property 'layersTree'");
		this._intro = !!options.intro;

		this._fragment = create_main_fragment$2(this, this._state);

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(TreeView.prototype, protoDev);
	assign(TreeView.prototype, methods$1);

	TreeView.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	/* src\Map.html generated by Svelte v2.13.4 */

	const serverBase = window.serverBase || '//maps.kosmosnimki.ru/';

	function data$3() {
		return {
			permalink: null,
			map: null
		}
	}
	var methods$2 = {
		createMap(it) {
			let app = it.app || {},
				gmxMap = app.gmxMap || {},
				state = it.state || {},
				layersTree = state.layersTree,
				mapID = gmxMap.mapID || '946GH',
				apiKey = gmxMap.apiKey,
				pos = state.map ? state.map.position : {};

			var osm = L.tileLayer('//tilessputnik.ru/{z}/{x}/{y}.png', {
				maxZoom: 18
			});
	layersTree.visible['6D24C9ED5F5C4F3189AABDC2CE8A751F'] = true;
			let map = new L.Map('map', {
				layers: [osm],
				center: new L.LatLng(pos.y || 0, pos.x || 60),
				zoom: pos.z || 3
			});

			var iconSidebar = L.control.iconSidebar({width111: 360});
			map.addControl(iconSidebar);
			var node = L.DomUtil.create('div', 'treeViewCont'),
				tabIcon = L.DomUtil.create('div', 'tabIcon', node),
				tabCont = L.DomUtil.create('div', 'tabCont', node);
			tabIcon.innerHTML = '<svg role="img" class="svgIcon"><use xlink:href="#overlays" href="#overlays"></use></svg>';

			var treePane = iconSidebar.setPane('treeView', {
				createTab: function(state) {
					if (state === 'active') {
						L.DomUtil.addClass(node, 'icon_active');
					} else {
						L.DomUtil.removeClass(node, 'icon_active');
					}
					return node
				}
			});

			map.gmxControlsManager.init();
			map.gmxControlsManager.setSvgSprites('//www.kosmosnimki.ru/lib/geomixer_1.3/img/svg-symbols.svg');

			L.gmx.loadMap(mapID, {leafletMap: map, setZIndex: true, visibility: layersTree.visible}).then(function(gmxMap) {
				this.set({gmxMap: gmxMap});

				iconSidebar.on('opened', function(e) {
					if (e.id === 'treeView') {
						this._initTree({container: treePane, layersTree: layersTree, rawTree: gmxMap.rawTree});
					}
				}, this);
				iconSidebar.open('treeView', true);
			}.bind(this));
			this.set({map: map, config: it});
		},
		_getNodeIndex(target) {
			let arr = target.parentNode.children,
				i, len;
			for(i = 0, len = arr.length; i < len; i++) {
				if (arr[i] === target) break;
			}
			return i === len ? null : i;
		},
		_initTree(it) {
			const app = new TreeView({
				target: it.container,
				data: {
					container: it.container,
					layersTree: it.layersTree,
					// config: it.config,
					rawTree: {
						type: 'map',
						content: it.rawTree
					}
				}
			});
			app.on('command', (ev) => {
				let {map, gmxMap} = this.get();
				let cmd = ev.cmd,
					target = ev.originalEvent.target,
					gmxLayer = gmxMap.layersByID[ev.id];
	// console.log('Map command', ev, gmxLayer);
				if (gmxLayer) {
					if (cmd === 'fitBounds') {
						map.fitBounds(gmxLayer.getBounds());
					} else if (cmd === 'toggleVisibility') {
						// if (target.checked) {
						if (gmxLayer._map) {
							map.removeLayer(gmxLayer);
						} else {
							map.addLayer(gmxLayer);
						}
					} else if (cmd === 'toggleStyle') {
						let num = this._getNodeIndex(target.parentNode),
							styles = gmxLayer.getStyles();
						if (target.classList.contains('enabled')) {
							target.classList.remove('enabled');
							styles[num].disabled = true;
						} else {
							target.classList.add('enabled');
							delete styles[num].disabled;
						}
						gmxLayer.setStyles(styles);
					}
				}
			});
		}
	};

	function onstate$1({ changed, current, previous }) {
		if (changed.permalink && current.permalink) {
			this.createMap(current.permalink);
		}
	}
	const file$3 = "src\\Map.html";

	function create_main_fragment$3(component, ctx) {
		var div, current;

		return {
			c: function create() {
				div = createElement("div");
				div.id = "map";
				addLoc(div, file$3, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);
				current = true;
			},

			p: noop,

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	function Map(options) {
		this._debugName = '<Map>';
		if (!options || (!options.target && !options.root)) throw new Error("'target' is a required option");
		init(this, options);
		this._state = assign(data$3(), options.data);
		this._intro = !!options.intro;

		this._handlers.state = [onstate$1];

		onstate$1.call(this, { changed: assignTrue({}, this._state), current: this._state });

		this._fragment = create_main_fragment$3(this, this._state);

		this.root._oncreate.push(() => {
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(Map.prototype, protoDev);
	assign(Map.prototype, methods$2);

	Map.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	/* src\App.html generated by Svelte v2.13.4 */

	const serverBase$1 = window.serverBase || '//maps.kosmosnimki.ru/';
	function data$4() {
		return {
			urlParams: {},
			dropdownMenu: [
				{ name: 'refresh', title: 'Refresh' },
				{ name: 'link', title: 'Share' },
				{ name: 'magic', title: 'Wizard' }
			],
			map: null,
			permalink: null,
			confStr: ''
		}
	}
	var methods$3 = {
		checkMe(it) {
	// console.log('checkMe', it);
		},
		editTrigger(node, flag) {
	// console.log('editTrigger', node, flag);
			let parentNode = node.parentNode,
				lastChild = parentNode.parentNode.lastChild;
			if (flag) {
				lastChild.previousElementSibling.classList.remove('hidden');
				lastChild.classList.add('hidden');
			} else {
				lastChild.previousElementSibling.classList.add('hidden');
				lastChild.classList.remove('hidden');
			}
			parentNode.firstChild.classList.remove('checked');
			parentNode.lastChild.classList.remove('checked');
			node.classList.add('checked');
		},
		getPermalink(id) {
			return fetch(serverBase$1 + 'TinyReference/Get.ashx?WrapStyle=None&id=' + id, {
					mode: 'cors',
					credentials: 'include'
				})
				.then(res => res.json())
				.then(json => {
					if (json.Status === 'ok') {
						let out = json.Result ? JSON.parse(json.Result) : {};
						this.set({permalink: out, confStr: JSON.stringify(out, null, 2)});
					}
	// console.log('TinyReference ____ ', json);
				});
				// .catch(err => console.log(err));
		}
	};

	function oncreate() {
		// this fires when the component has been
		// rendered to the DOM
		// console.log('in oncreate');
		
	}
	function onstate$2({ changed, current, previous }) {
	// console.log('in onstate', changed, current, previous);
		if (changed.urlParams) {
			this.getPermalink(current.urlParams.config);
		}
	}
	function onupdate({ changed, current, previous }) {
		// console.log('in onupdate', changed, current, previous);
		if (changed.confStr) {
			let node = document.getElementsByClassName('view')[0];
			node.innerHTML = current.confStr;
			hljs.highlightBlock(node);
		}
	}
	const file$4 = "src\\App.html";

	function create_main_fragment$4(component, ctx) {
		var div, div_1, div_2, div_3, text_2, div_4, div_5, ul, li, i, text_3, span, text_4, text_6, li_1, i_1, text_7, span_1, text_8, text_11, textarea, text_12, div_6, text_13, text_18, div_7, map_updating = {}, current;

		var each_value = ctx.dropdownMenu;

		var each_blocks = [];

		for (var i_2 = 0; i_2 < each_value.length; i_2 += 1) {
			each_blocks[i_2] = create_each_block$1(component, get_each_context$1(ctx, each_value, i_2));
		}

		function click_handler_1(event) {
			component.editTrigger(this, true);
		}

		function click_handler_2(event) {
			component.editTrigger(this);
		}

		var map_initial_data = { permalink: ctx.permalink };
		if (ctx.map  !== void 0) {
			map_initial_data.map = ctx.map ;
			map_updating.map = true;
		}
		var map = new Map({
			root: component.root,
			store: component.store,
			data: map_initial_data,
			_bind(changed, childState) {
				var newState = {};
				if (!map_updating.map && changed.map) {
					newState.map = childState.map;
				}
				component._set(newState);
				map_updating = {};
			}
		});

		component.root._beforecreate.push(() => {
			map._bind({ map: 1 }, map.get());
		});

		return {
			c: function create() {
				div = createElement("div");
				div_1 = createElement("div");
				div_2 = createElement("div");
				div_3 = createElement("div");

				for (var i_2 = 0; i_2 < each_blocks.length; i_2 += 1) {
					each_blocks[i_2].c();
				}

				text_2 = createText("\r\n\t\t");
				div_4 = createElement("div");
				div_5 = createElement("div");
				ul = createElement("ul");
				li = createElement("li");
				i = createElement("i");
				text_3 = createText("\r\n\t\t\t\t\t\t");
				span = createElement("span");
				text_4 = createText("Edit");
				text_6 = createText("\r\n\t\t\t\t\t");
				li_1 = createElement("li");
				i_1 = createElement("i");
				text_7 = createText("\r\n\t\t\t\t\t\t");
				span_1 = createElement("span");
				text_8 = createText("View");
				text_11 = createText("\r\n\t\t\t\t");
				textarea = createElement("textarea");
				text_12 = createText("\r\n\t\t\t\t");
				div_6 = createElement("div");
				text_13 = createText(ctx.confStr);
				text_18 = createText("\r\n");
				div_7 = createElement("div");
				map._fragment.c();
				div_3.className = "dropdownMenuWidget svelte-foruym";
				addLoc(div_3, file$4, 3, 3, 141);
				div_2.className = "sidebarPanel-toolbarContainer svelte-foruym";
				addLoc(div_2, file$4, 2, 2, 93);
				i.className = "icon-bell";
				addLoc(i, file$4, 16, 6, 610);
				addLoc(span, file$4, 17, 6, 643);
				addListener(li, "click", click_handler_1);
				li.className = "dropdownMenuWidget-item svelte-foruym";
				addLoc(li, file$4, 15, 5, 531);
				i_1.className = "icon-eye";
				addLoc(i_1, file$4, 20, 6, 760);
				addLoc(span_1, file$4, 21, 6, 792);
				addListener(li_1, "click", click_handler_2);
				li_1.className = "dropdownMenuWidget-item checked svelte-foruym";
				addLoc(li_1, file$4, 19, 5, 679);
				ul.className = "dropdownMenuWidget right svelte-foruym";
				addLoc(ul, file$4, 14, 4, 487);
				textarea.className = "text-input hidden svelte-foruym";
				textarea.value = ctx.confStr;
				addLoc(textarea, file$4, 24, 4, 838);
				div_6.className = "view svelte-foruym";
				addLoc(div_6, file$4, 25, 4, 900);
				div_5.className = "editor svelte-foruym";
				addLoc(div_5, file$4, 13, 3, 461);
				div_4.className = "sidebarPanel-codeEditorContainer svelte-foruym";
				addLoc(div_4, file$4, 12, 2, 410);
				div_1.className = "sidebarPanel svelte-foruym";
				addLoc(div_1, file$4, 1, 1, 63);
				div.className = "editor-sidebarContainer editor_sidebarExpanded svelte-foruym";
				addLoc(div, file$4, 0, 0, 0);
				div_7.className = "editor-viewerContainer editor_sidebarExpanded";
				addLoc(div_7, file$4, 30, 0, 973);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);
				append(div, div_1);
				append(div_1, div_2);
				append(div_2, div_3);

				for (var i_2 = 0; i_2 < each_blocks.length; i_2 += 1) {
					each_blocks[i_2].m(div_3, null);
				}

				append(div_1, text_2);
				append(div_1, div_4);
				append(div_4, div_5);
				append(div_5, ul);
				append(ul, li);
				append(li, i);
				append(li, text_3);
				append(li, span);
				append(span, text_4);
				append(ul, text_6);
				append(ul, li_1);
				append(li_1, i_1);
				append(li_1, text_7);
				append(li_1, span_1);
				append(span_1, text_8);
				append(div_5, text_11);
				append(div_5, textarea);
				append(div_5, text_12);
				append(div_5, div_6);
				append(div_6, text_13);
				insert(target, text_18, anchor);
				insert(target, div_7, anchor);
				map._mount(div_7, null);
				current = true;
			},

			p: function update(changed, _ctx) {
				ctx = _ctx;
				if (changed.dropdownMenu) {
					each_value = ctx.dropdownMenu;

					for (var i_2 = 0; i_2 < each_value.length; i_2 += 1) {
						const child_ctx = get_each_context$1(ctx, each_value, i_2);

						if (each_blocks[i_2]) {
							each_blocks[i_2].p(changed, child_ctx);
						} else {
							each_blocks[i_2] = create_each_block$1(component, child_ctx);
							each_blocks[i_2].c();
							each_blocks[i_2].m(div_3, null);
						}
					}

					for (; i_2 < each_blocks.length; i_2 += 1) {
						each_blocks[i_2].d(1);
					}
					each_blocks.length = each_value.length;
				}

				if (!current || changed.confStr) {
					textarea.value = ctx.confStr;
					setData(text_13, ctx.confStr);
				}

				var map_changes = {};
				if (changed.permalink) map_changes.permalink = ctx.permalink;
				if (!map_updating.map && changed.map) {
					map_changes.map = ctx.map ;
					map_updating.map = ctx.map  !== void 0;
				}
				map._set(map_changes);
				map_updating = {};
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (map) map._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div);
				}

				destroyEach(each_blocks, detach);

				removeListener(li, "click", click_handler_1);
				removeListener(li_1, "click", click_handler_2);
				if (detach) {
					detachNode(text_18);
					detachNode(div_7);
				}

				map.destroy();
			}
		};
	}

	// (5:0) {#each dropdownMenu as it}
	function create_each_block$1(component, ctx) {
		var div, i, i_class_value, text, span, text_1_value = ctx.it.title, text_1, div_class_value;

		return {
			c: function create() {
				div = createElement("div");
				i = createElement("i");
				text = createText("\r\n\t\t\t\t\t");
				span = createElement("span");
				text_1 = createText(text_1_value);
				i.className = i_class_value = "icon-" + ctx.it.name + " svelte-foruym";
				addLoc(i, file$4, 6, 5, 304);
				addLoc(span, file$4, 7, 5, 341);

				div._svelte = { component, ctx };

				addListener(div, "click", click_handler);
				div.className = div_class_value = "dropdownMenuWidget-item" + (ctx.it.checked ? ' checked' : '') + " svelte-foruym";
				addLoc(div, file$4, 5, 4, 207);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);
				append(div, i);
				append(div, text);
				append(div, span);
				append(span, text_1);
			},

			p: function update(changed, ctx) {
				if ((changed.dropdownMenu) && i_class_value !== (i_class_value = "icon-" + ctx.it.name + " svelte-foruym")) {
					i.className = i_class_value;
				}

				if ((changed.dropdownMenu) && text_1_value !== (text_1_value = ctx.it.title)) {
					setData(text_1, text_1_value);
				}

				div._svelte.ctx = ctx;
				if ((changed.dropdownMenu) && div_class_value !== (div_class_value = "dropdownMenuWidget-item" + (ctx.it.checked ? ' checked' : '') + " svelte-foruym")) {
					div.className = div_class_value;
				}
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div);
				}

				removeListener(div, "click", click_handler);
			}
		};
	}

	function get_each_context$1(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.it = list[i];
		child_ctx.each_value = list;
		child_ctx.it_index = i;
		return child_ctx;
	}

	function click_handler(event) {
		const { component, ctx } = this._svelte;

		component.checkMe(ctx.it);
	}

	function App(options) {
		this._debugName = '<App>';
		if (!options || (!options.target && !options.root)) throw new Error("'target' is a required option");
		init(this, options);
		this._state = assign(data$4(), options.data);
		if (!('dropdownMenu' in this._state)) console.warn("<App> was created without expected data property 'dropdownMenu'");
		if (!('confStr' in this._state)) console.warn("<App> was created without expected data property 'confStr'");
		if (!('permalink' in this._state)) console.warn("<App> was created without expected data property 'permalink'");
		if (!('map' in this._state)) console.warn("<App> was created without expected data property 'map'");
		this._intro = !!options.intro;

		this._handlers.state = [onstate$2];
		this._handlers.update = [onupdate];

		onstate$2.call(this, { changed: assignTrue({}, this._state), current: this._state });

		this._fragment = create_main_fragment$4(this, this._state);

		this.root._oncreate.push(() => {
			oncreate.call(this);
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(App.prototype, protoDev);
	assign(App.prototype, methods$3);

	App.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	let pars = (() => {
		let p = {};
		location.search.substr(1).split('&').forEach((it) => {
			let arr = it.split('=');
			p[arr[0]] = arr[1];
		});
		return p;
	})();

	const app = new App({
		target: document.body,
		//target: document.getElementsByClassName('editor-sidebarContainer')[0] || document.body,
		data: {
			urlParams: pars,
			name: 'world'
		}
	});

	return app;

}());
//# sourceMappingURL=bundle.js.map
