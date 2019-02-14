var app = (function (leaflet) {
	'use strict';

	leaflet = leaflet && leaflet.hasOwnProperty('default') ? leaflet['default'] : leaflet;

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

	function addListener(node, event, handler, options) {
		node.addEventListener(event, handler, options);
	}

	function removeListener(node, event, handler, options) {
		node.removeEventListener(event, handler, options);
	}

	function setAttribute(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else node.setAttribute(attribute, value);
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

	/* src/LegendIconCell.html generated by Svelte v2.16.1 */

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
	const file = "src/LegendIconCell.html";

	function create_main_fragment(component, ctx) {
		var span, current;

		function select_block_type(ctx) {
			if (ctx.item.RenderStyle.iconUrl) return create_if_block;
			return create_else_block;
		}

		var current_block_type = select_block_type(ctx);
		var if_block = current_block_type(component, ctx);

		return {
			c: function create() {
				span = createElement("span");
				if_block.c();
				span.className = "legendIconCell style svelte-1vhs5pf";
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

	// (4:0) {:else}
	function create_else_block(component, ctx) {
		var span, span_class_value;

		return {
			c: function create() {
				span = createElement("span");
				span.className = span_class_value = "" + ctx.type + " legendIconStyle " + " svelte-1vhs5pf";
				setStyle(span, "background-color", ctx.backgroundColor);
				setStyle(span, "border-color", ctx.borderColor);
				addLoc(span, file, 4, 1, 150);
			},

			m: function mount(target, anchor) {
				insert(target, span, anchor);
			},

			p: function update(changed, ctx) {
				if ((changed.type) && span_class_value !== (span_class_value = "" + ctx.type + " legendIconStyle " + " svelte-1vhs5pf")) {
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

	// (2:0) {#if item.RenderStyle.iconUrl}
	function create_if_block(component, ctx) {
		var img, img_src_value;

		return {
			c: function create() {
				img = createElement("img");
				img.src = img_src_value = ctx.item.RenderStyle.iconUrl;
				setAttribute(img, "crossorigin", "");
				img.alt = "Style Icon";
				img.className = "svelte-1vhs5pf";
				addLoc(img, file, 2, 1, 68);
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

	function LegendIconCell(options) {
		this._debugName = '<LegendIconCell>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

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

	/* src/LineNode.html generated by Svelte v2.16.1 */

	function checkboxType({ parentProps }) {
		return parentProps && parentProps.list ? 'radio' : 'checkbox';
	}

	function checkboxName({ parentProps }) {
		return parentProps && parentProps.GroupID || '';
	}

	function properties({ line }) {
		return line.content.properties;
	}

	function isGroup({ line }) {
		return line.type === 'group';
	}

	function isShowCheckbox({ properties }) {
		return properties.ShowCheckbox;
	}

	function isInfo({ properties }) {
		return properties.MetaProperties && Object.keys(properties.MetaProperties).length;
	}

	function isRadio({ properties }) {
		return properties.list ? 'radio' : 'checkbox';
	}

	function nodeID({ properties }) {
		return properties ? properties.name || properties.GroupID : 'root';
	}

	function styles({ properties }) {
		return properties.gmxStyles ? properties.gmxStyles.styles : [];
	}

	function multiStyles({ properties }) {
		return properties.gmxStyles && properties.gmxStyles.styles.length > 1 ? 'multiStyles' : '';
	}

	function isRoot({ properties }) {
		return properties.MapID;
	}

	function isOpened({line, layersTree}) {
		let content = line.content,
			props = content.properties,
			nodeID = props.GroupID || 'root';
		return layersTree.expanded[nodeID];
	}

	function isGroupVisible({line, layersTree}) {
		let content = line.content,
			props = content.properties,
			nodeID = props.GroupID || 'root';
		return layersTree.visible[nodeID];
	}

	function isVisible({line, layersTree}) {
		return layersTree.visible[line.content.properties.name];
	}

	function data$1() {
		return {
			//gmxTimeline: false,
			line: null
		}
	}
	var methods = {
		clickOnExpander(target) {
			let {line} = this.get();
			
			if (line.type === 'group' && !line.content.properties.ShowCheckbox) {
				let node = this.refs.ul;
				if (node) {
					let isCollapse = node.classList.contains('collapse'),
						expander = this.refs.expander;
					if (isCollapse) {
						node.classList.remove('collapse');
						expander.checked = true;
					} else {
						node.classList.add('collapse');
						expander.checked = false;
					}
				}
			}
		},
		toggleTimeline(node) {
			if (node) {
				if (node.classList.contains('disabled')) {
					node.classList.remove('disabled');
					node.classList.add('enabled');
				} else {
					node.classList.add('disabled');
					node.classList.remove('enabled');
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

	const file$1 = "src/LineNode.html";

	function get_each_context_1(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.child = list[i];
		return child_ctx;
	}

	function get_each_context(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.it = list[i];
		return child_ctx;
	}

	function create_main_fragment$1(component, ctx) {
		var li, div, text, li_class_value, current;

		var if_block0 = (ctx.properties) && create_if_block_1(component, ctx);

		var if_block1 = (ctx.line.content.children) && create_if_block$1(component, ctx);

		return {
			c: function create() {
				li = createElement("li");
				div = createElement("div");
				if (if_block0) if_block0.c();
				text = createText("\n\n");
				if (if_block1) if_block1.c();
				div.className = "mega";
				addLoc(div, file$1, 1, 0, 67);
				li.className = li_class_value = "line cmd:toggleIcons id:" + ctx.nodeID + " " + ctx.line.type + " svelte-1uracym";
				addLoc(li, file$1, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, li, anchor);
				append(li, div);
				if (if_block0) if_block0.m(div, null);
				append(li, text);
				if (if_block1) if_block1.m(li, null);
				component.refs.line = li;
				current = true;
			},

			p: function update(changed, ctx) {
				if (ctx.properties) {
					if (if_block0) {
						if_block0.p(changed, ctx);
					} else {
						if_block0 = create_if_block_1(component, ctx);
						if (if_block0) if_block0.c();
					}

					if_block0.i(div, null);
				} else if (if_block0) {
					if_block0.o(function() {
						if_block0.d(1);
						if_block0 = null;
					});
				}

				if (ctx.line.content.children) {
					if (if_block1) {
						if_block1.p(changed, ctx);
					} else {
						if_block1 = create_if_block$1(component, ctx);
						if (if_block1) if_block1.c();
					}

					if_block1.i(li, null);
				} else if (if_block1) {
					if_block1.o(function() {
						if_block1.d(1);
						if_block1 = null;
					});
				}

				if ((!current || changed.nodeID || changed.line) && li_class_value !== (li_class_value = "line cmd:toggleIcons id:" + ctx.nodeID + " " + ctx.line.type + " svelte-1uracym")) {
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

				if (if_block0) if_block0.o(outrocallback);
				else outrocallback();

				if (if_block1) if_block1.o(outrocallback);
				else outrocallback();

				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(li);
				}

				if (if_block0) if_block0.d();
				if (if_block1) if_block1.d();
				if (component.refs.line === li) component.refs.line = null;
			}
		};
	}

	// (3:0) {#if properties}
	function create_if_block_1(component, ctx) {
		var text, if_block1_anchor, current;

		var if_block0 = (ctx.line.type !== 'map') && create_if_block_8(component, ctx);

		var if_block1 = (ctx.line.type !== 'map') && create_if_block_2(component, ctx);

		return {
			c: function create() {
				if (if_block0) if_block0.c();
				text = createText("\n ");
				if (if_block1) if_block1.c();
				if_block1_anchor = createComment();
			},

			m: function mount(target, anchor) {
				if (if_block0) if_block0.m(target, anchor);
				insert(target, text, anchor);
				if (if_block1) if_block1.m(target, anchor);
				insert(target, if_block1_anchor, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				if (ctx.line.type !== 'map') {
					if (if_block0) {
						if_block0.p(changed, ctx);
					} else {
						if_block0 = create_if_block_8(component, ctx);
						if_block0.c();
						if_block0.m(text.parentNode, text);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (ctx.line.type !== 'map') {
					if (if_block1) {
						if_block1.p(changed, ctx);
					} else {
						if_block1 = create_if_block_2(component, ctx);
						if (if_block1) if_block1.c();
					}

					if_block1.i(if_block1_anchor.parentNode, if_block1_anchor);
				} else if (if_block1) {
					if_block1.o(function() {
						if_block1.d(1);
						if_block1 = null;
					});
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (if_block1) if_block1.o(outrocallback);
				else outrocallback();

				current = false;
			},

			d: function destroy$$1(detach) {
				if (if_block0) if_block0.d(detach);
				if (detach) {
					detachNode(text);
				}

				if (if_block1) if_block1.d(detach);
				if (detach) {
					detachNode(if_block1_anchor);
				}
			}
		};
	}

	// (4:1) {#if line.type !== 'map'}
	function create_if_block_8(component, ctx) {
		var text, if_block1_anchor;

		var if_block0 = (ctx.line.type === 'group') && create_if_block_13(component, ctx);

		var if_block1 = (ctx.line.type === 'layer') && create_if_block_9(component, ctx);

		return {
			c: function create() {
				if (if_block0) if_block0.c();
				text = createText("\n\t\t");
				if (if_block1) if_block1.c();
				if_block1_anchor = createComment();
			},

			m: function mount(target, anchor) {
				if (if_block0) if_block0.m(target, anchor);
				insert(target, text, anchor);
				if (if_block1) if_block1.m(target, anchor);
				insert(target, if_block1_anchor, anchor);
			},

			p: function update(changed, ctx) {
				if (ctx.line.type === 'group') {
					if (if_block0) {
						if_block0.p(changed, ctx);
					} else {
						if_block0 = create_if_block_13(component, ctx);
						if_block0.c();
						if_block0.m(text.parentNode, text);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (ctx.line.type === 'layer') {
					if (if_block1) {
						if_block1.p(changed, ctx);
					} else {
						if_block1 = create_if_block_9(component, ctx);
						if_block1.c();
						if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
					}
				} else if (if_block1) {
					if_block1.d(1);
					if_block1 = null;
				}
			},

			d: function destroy$$1(detach) {
				if (if_block0) if_block0.d(detach);
				if (detach) {
					detachNode(text);
				}

				if (if_block1) if_block1.d(detach);
				if (detach) {
					detachNode(if_block1_anchor);
				}
			}
		};
	}

	// (5:1) {#if line.type === 'group'}
	function create_if_block_13(component, ctx) {
		var input, text, span;

		function click_handler(event) {
			component.clickOnExpander(this);
		}

		return {
			c: function create() {
				input = createElement("input");
				text = createText("\n\t");
				span = createElement("span");
				input.className = "expander expanderInput hidden svelte-1uracym";
				setAttribute(input, "type", "checkbox");
				input.checked = ctx.isOpened;
				addLoc(input, file$1, 5, 1, 160);
				addListener(span, "click", click_handler);
				span.className = "expander pointer expanderCont cmd:clickOnExpander svelte-1uracym";
				addLoc(span, file$1, 6, 1, 259);
			},

			m: function mount(target, anchor) {
				insert(target, input, anchor);
				component.refs.expander = input;
				insert(target, text, anchor);
				insert(target, span, anchor);
			},

			p: function update(changed, ctx) {
				if (changed.isOpened) {
					input.checked = ctx.isOpened;
				}
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(input);
				}

				if (component.refs.expander === input) component.refs.expander = null;
				if (detach) {
					detachNode(text);
					detachNode(span);
				}

				removeListener(span, "click", click_handler);
			}
		};
	}

	// (9:2) {#if line.type === 'layer'}
	function create_if_block_9(component, ctx) {
		var text0, span1, text1, span0, svg, use, text2;

		var if_block0 = (ctx.properties.styles.length > 1) && create_if_block_12(component, ctx);

		var if_block1 = (ctx.isInfo) && create_if_block_11(component, ctx);

		var if_block2 = (ctx.gmxTimeline && ctx.properties.Temporal && (ctx.properties.IsRasterCatalog || (ctx.properties.Quicklook && ctx.properties.Quicklook !== 'null'))) && create_if_block_10(component, ctx);

		return {
			c: function create() {
				if (if_block0) if_block0.c();
				text0 = createText("\n\t");
				span1 = createElement("span");
				if (if_block1) if_block1.c();
				text1 = createText("\n \t\t");
				span0 = createElement("span");
				svg = createSvgElement("svg");
				use = createSvgElement("use");
				text2 = createText("\n\t\t\t\n\t\t");
				if (if_block2) if_block2.c();
				setXlinkAttribute(use, "xlink:href", "#center-on-click");
				setAttribute(use, "href", "#center-on-click");
				addLoc(use, file$1, 16, 115, 952);
				setAttribute(svg, "role", "img");
				setAttribute(svg, "class", "svgIcon svelte-1uracym");
				addLoc(svg, file$1, 16, 83, 920);
				span0.className = "pointer cmd:fitBounds cont-center svelte-1uracym";
				span0.title = "Move map to this layer";
				addLoc(span0, file$1, 16, 3, 840);
				span1.className = "icons  svelte-1uracym";
				addLoc(span1, file$1, 12, 1, 613);
			},

			m: function mount(target, anchor) {
				if (if_block0) if_block0.m(target, anchor);
				insert(target, text0, anchor);
				insert(target, span1, anchor);
				if (if_block1) if_block1.m(span1, null);
				append(span1, text1);
				append(span1, span0);
				append(span0, svg);
				append(svg, use);
				append(span1, text2);
				if (if_block2) if_block2.m(span1, null);
			},

			p: function update(changed, ctx) {
				if (ctx.properties.styles.length > 1) {
					if (!if_block0) {
						if_block0 = create_if_block_12(component, ctx);
						if_block0.c();
						if_block0.m(text0.parentNode, text0);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (ctx.isInfo) {
					if (!if_block1) {
						if_block1 = create_if_block_11(component, ctx);
						if_block1.c();
						if_block1.m(span1, text1);
					}
				} else if (if_block1) {
					if_block1.d(1);
					if_block1 = null;
				}

				if (ctx.gmxTimeline && ctx.properties.Temporal && (ctx.properties.IsRasterCatalog || (ctx.properties.Quicklook && ctx.properties.Quicklook !== 'null'))) {
					if (!if_block2) {
						if_block2 = create_if_block_10(component, ctx);
						if_block2.c();
						if_block2.m(span1, null);
					}
				} else if (if_block2) {
					if_block2.d(1);
					if_block2 = null;
				}
			},

			d: function destroy$$1(detach) {
				if (if_block0) if_block0.d(detach);
				if (detach) {
					detachNode(text0);
					detachNode(span1);
				}

				if (if_block1) if_block1.d();
				if (if_block2) if_block2.d();
			}
		};
	}

	// (10:3) {#if properties.styles.length > 1}
	function create_if_block_12(component, ctx) {
		var span, svg, use;

		return {
			c: function create() {
				span = createElement("span");
				svg = createSvgElement("svg");
				use = createSvgElement("use");
				setXlinkAttribute(use, "xlink:href", "#overlays");
				setAttribute(use, "href", "#overlays");
				addLoc(use, file$1, 10, 61, 538);
				setAttribute(svg, "role", "img");
				setAttribute(svg, "class", "svgIcon svelte-1uracym");
				addLoc(svg, file$1, 10, 29, 506);
				span.className = "cont-overlays svelte-1uracym";
				addLoc(span, file$1, 10, 1, 478);
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

	// (14:2) {#if isInfo}
	function create_if_block_11(component, ctx) {
		var span, svg, use;

		return {
			c: function create() {
				span = createElement("span");
				svg = createSvgElement("svg");
				use = createSvgElement("use");
				setXlinkAttribute(use, "xlink:href", "#info-circle-i");
				setAttribute(use, "href", "#info-circle-i");
				addLoc(use, file$1, 14, 104, 754);
				setAttribute(svg, "role", "img");
				setAttribute(svg, "class", "svgIcon svelte-1uracym");
				addLoc(svg, file$1, 14, 72, 722);
				span.className = "pointer cmd:showInfo cont-info svelte-1uracym";
				span.title = "View description";
				addLoc(span, file$1, 14, 2, 652);
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

	// (19:2) {#if gmxTimeline && properties.Temporal && (properties.IsRasterCatalog || (properties.Quicklook && properties.Quicklook !== 'null'))}
	function create_if_block_10(component, ctx) {
		var span, svg, use;

		function click_handler(event) {
			component.toggleTimeline(this);
		}

		return {
			c: function create() {
				span = createElement("span");
				svg = createSvgElement("svg");
				use = createSvgElement("use");
				setXlinkAttribute(use, "xlink:href", "#timeline-icon");
				setAttribute(use, "href", "#timeline-icon");
				addLoc(use, file$1, 19, 146, 1317);
				setAttribute(svg, "role", "img");
				setAttribute(svg, "class", "svgIcon svelte-1uracym");
				addLoc(svg, file$1, 19, 114, 1285);
				addListener(span, "click", click_handler);
				span.className = "pointer cmd:toggleTimeline timeline disabled svelte-1uracym";
				span.title = "Add timeline";
				addLoc(span, file$1, 19, 2, 1173);
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

	// (25:1) {#if line.type !== 'map'}
	function create_if_block_2(component, ctx) {
		var span, text0, text1, label, text2_value = ctx.properties.title, text2, label_class_value, text3, div, text4_value = ctx.properties.description || '', text4, div_class_value, text5, current;

		function select_block_type(ctx) {
			if (ctx.line.type === 'group') return create_if_block_6;
			return create_else_block$1;
		}

		var current_block_type = select_block_type(ctx);
		var if_block0 = current_block_type(component, ctx);

		var if_block1 = (ctx.line.type === 'layer' && ctx.styles.length && ctx.styles.length < 2 && ctx.styles[0].RenderStyle) && create_if_block_5(component, ctx);

		function click_handler(event) {
			component.clickOnExpander(this);
		}

		var if_block2 = (ctx.line.type === 'layer') && create_if_block_3(component, ctx);

		return {
			c: function create() {
				span = createElement("span");
				if_block0.c();
				text0 = createText("\n\t\t");
				if (if_block1) if_block1.c();
				text1 = createText("\n\t\t");
				label = createElement("label");
				text2 = createText(text2_value);
				text3 = createText("\n\t\t");
				div = createElement("div");
				text4 = createText(text4_value);
				text5 = createText("\n\t\t");
				if (if_block2) if_block2.c();
				addListener(label, "click", click_handler);
				label.className = label_class_value = "pointer title \n\t\t\t" + (!ctx.isGroup ? ' cmd:toggleVisibility' : (ctx.isShowCheckbox ? ' cmd:toggleGroup' : '')) + "\n\t\t\t" + ctx.multiStyles + "\n\t\t\t" + " svelte-1uracym";
				addLoc(label, file$1, 36, 2, 2086);
				div.className = div_class_value = "description " + (ctx.properties.description ? '' : 'collapse') + " svelte-1uracym";
				addLoc(div, file$1, 42, 2, 2291);
				span.className = "cont";
				addLoc(span, file$1, 25, 1, 1488);
			},

			m: function mount(target, anchor) {
				insert(target, span, anchor);
				if_block0.m(span, null);
				append(span, text0);
				if (if_block1) if_block1.m(span, null);
				append(span, text1);
				append(span, label);
				append(label, text2);
				append(span, text3);
				append(span, div);
				append(div, text4);
				append(span, text5);
				if (if_block2) if_block2.m(span, null);
				current = true;
			},

			p: function update(changed, ctx) {
				if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
					if_block0.p(changed, ctx);
				} else {
					if_block0.d(1);
					if_block0 = current_block_type(component, ctx);
					if_block0.c();
					if_block0.m(span, text0);
				}

				if (ctx.line.type === 'layer' && ctx.styles.length && ctx.styles.length < 2 && ctx.styles[0].RenderStyle) {
					if (if_block1) {
						if_block1.p(changed, ctx);
					} else {
						if_block1 = create_if_block_5(component, ctx);
						if (if_block1) if_block1.c();
					}

					if_block1.i(span, text1);
				} else if (if_block1) {
					if_block1.o(function() {
						if_block1.d(1);
						if_block1 = null;
					});
				}

				if ((!current || changed.properties) && text2_value !== (text2_value = ctx.properties.title)) {
					setData(text2, text2_value);
				}

				if ((!current || changed.isGroup || changed.isShowCheckbox || changed.multiStyles) && label_class_value !== (label_class_value = "pointer title \n\t\t\t" + (!ctx.isGroup ? ' cmd:toggleVisibility' : (ctx.isShowCheckbox ? ' cmd:toggleGroup' : '')) + "\n\t\t\t" + ctx.multiStyles + "\n\t\t\t" + " svelte-1uracym")) {
					label.className = label_class_value;
				}

				if ((!current || changed.properties) && text4_value !== (text4_value = ctx.properties.description || '')) {
					setData(text4, text4_value);
				}

				if ((!current || changed.properties) && div_class_value !== (div_class_value = "description " + (ctx.properties.description ? '' : 'collapse') + " svelte-1uracym")) {
					div.className = div_class_value;
				}

				if (ctx.line.type === 'layer') {
					if (if_block2) {
						if_block2.p(changed, ctx);
					} else {
						if_block2 = create_if_block_3(component, ctx);
						if (if_block2) if_block2.c();
					}

					if_block2.i(span, null);
				} else if (if_block2) {
					if_block2.o(function() {
						if_block2.d(1);
						if_block2 = null;
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

				if (if_block1) if_block1.o(outrocallback);
				else outrocallback();

				if (if_block2) if_block2.o(outrocallback);
				else outrocallback();

				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(span);
				}

				if_block0.d();
				if (if_block1) if_block1.d();
				removeListener(label, "click", click_handler);
				if (if_block2) if_block2.d();
			}
		};
	}

	// (31:2) {:else}
	function create_else_block$1(component, ctx) {
		var input, input_class_value;

		return {
			c: function create() {
				input = createElement("input");
				input.className = input_class_value = "check visibility pointer cmd:toggleVisibility " + ctx.line.type + " id:" + ctx.nodeID + " svelte-1uracym";
				input.name = ctx.checkboxName;
				setAttribute(input, "type", ctx.checkboxType);
				input.checked = ctx.isVisible;
				addLoc(input, file$1, 31, 3, 1751);
			},

			m: function mount(target, anchor) {
				insert(target, input, anchor);
			},

			p: function update(changed, ctx) {
				if ((changed.line || changed.nodeID) && input_class_value !== (input_class_value = "check visibility pointer cmd:toggleVisibility " + ctx.line.type + " id:" + ctx.nodeID + " svelte-1uracym")) {
					input.className = input_class_value;
				}

				if (changed.checkboxName) {
					input.name = ctx.checkboxName;
				}

				if (changed.checkboxType) {
					setAttribute(input, "type", ctx.checkboxType);
				}

				if (changed.isVisible) {
					input.checked = ctx.isVisible;
				}
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(input);
				}
			}
		};
	}

	// (27:2) {#if line.type === 'group'}
	function create_if_block_6(component, ctx) {
		var if_block_anchor;

		var if_block = (ctx.properties.ShowCheckbox) && create_if_block_7(component, ctx);

		return {
			c: function create() {
				if (if_block) if_block.c();
				if_block_anchor = createComment();
			},

			m: function mount(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insert(target, if_block_anchor, anchor);
			},

			p: function update(changed, ctx) {
				if (ctx.properties.ShowCheckbox) {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block_7(component, ctx);
						if_block.c();
						if_block.m(if_block_anchor.parentNode, if_block_anchor);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}
			},

			d: function destroy$$1(detach) {
				if (if_block) if_block.d(detach);
				if (detach) {
					detachNode(if_block_anchor);
				}
			}
		};
	}

	// (28:3) {#if properties.ShowCheckbox}
	function create_if_block_7(component, ctx) {
		var input, input_class_value;

		return {
			c: function create() {
				input = createElement("input");
				input.className = input_class_value = "check visibility pointer cmd:toggleGroup " + ctx.line.type + " id:" + ctx.nodeID + " svelte-1uracym";
				input.name = ctx.checkboxName;
				setAttribute(input, "type", ctx.checkboxType);
				input.checked = ctx.isGroupVisible;
				addLoc(input, file$1, 28, 4, 1575);
			},

			m: function mount(target, anchor) {
				insert(target, input, anchor);
			},

			p: function update(changed, ctx) {
				if ((changed.line || changed.nodeID) && input_class_value !== (input_class_value = "check visibility pointer cmd:toggleGroup " + ctx.line.type + " id:" + ctx.nodeID + " svelte-1uracym")) {
					input.className = input_class_value;
				}

				if (changed.checkboxName) {
					input.name = ctx.checkboxName;
				}

				if (changed.checkboxType) {
					setAttribute(input, "type", ctx.checkboxType);
				}

				if (changed.isGroupVisible) {
					input.checked = ctx.isGroupVisible;
				}
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(input);
				}
			}
		};
	}

	// (34:2) {#if line.type === 'layer' && styles.length && styles.length < 2 && styles[0].RenderStyle}
	function create_if_block_5(component, ctx) {
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

	// (44:2) {#if line.type === 'layer'}
	function create_if_block_3(component, ctx) {
		var if_block_anchor, current;

		var if_block = (ctx.styles.length && ctx.styles.length > 1 && ctx.styles[0].RenderStyle) && create_if_block_4(component, ctx);

		return {
			c: function create() {
				if (if_block) if_block.c();
				if_block_anchor = createComment();
			},

			m: function mount(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insert(target, if_block_anchor, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				if (ctx.styles.length && ctx.styles.length > 1 && ctx.styles[0].RenderStyle) {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block_4(component, ctx);
						if (if_block) if_block.c();
					}

					if_block.i(if_block_anchor.parentNode, if_block_anchor);
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
				if (if_block) if_block.d(detach);
				if (detach) {
					detachNode(if_block_anchor);
				}
			}
		};
	}

	// (45:3) {#if styles.length && styles.length > 1 && styles[0].RenderStyle}
	function create_if_block_4(component, ctx) {
		var div1, div0, current;

		var each_value = ctx.styles;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block_1(component, get_each_context(ctx, each_value, i));
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
				div1 = createElement("div");
				div0 = createElement("div");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}
				div0.className = "legend-cont svelte-1uracym";
				addLoc(div0, file$1, 46, 4, 2523);
				div1.className = "legend svelte-1uracym";
				addLoc(div1, file$1, 45, 3, 2498);
			},

			m: function mount(target, anchor) {
				insert(target, div1, anchor);
				append(div1, div0);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].i(div0, null);
				}

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
							each_blocks[i] = create_each_block_1(component, child_ctx);
							each_blocks[i].c();
						}
						each_blocks[i].i(div0, null);
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
				if (detach) {
					detachNode(div1);
				}

				destroyEach(each_blocks, detach);
			}
		};
	}

	// (48:4) {#each styles as it}
	function create_each_block_1(component, ctx) {
		var div, span0, text0, text1, span1, text2_value = ctx.it.Name, text2, current;

		var legendiconcell_initial_data = { item: ctx.it, type: ctx.properties.GeometryType };
		var legendiconcell = new LegendIconCell({
			root: component.root,
			store: component.store,
			data: legendiconcell_initial_data
		});

		return {
			c: function create() {
				div = createElement("div");
				span0 = createElement("span");
				text0 = createText("\n\t\t\t\t\t\t");
				legendiconcell._fragment.c();
				text1 = createText("\n\t\t\t\t\t\t");
				span1 = createElement("span");
				text2 = createText(text2_value);
				span0.className = "legendIconEye enabled pointer cmd:toggleStyle svelte-1uracym";
				addLoc(span0, file$1, 49, 6, 2616);
				span1.className = "styleName svelte-1uracym";
				addLoc(span1, file$1, 51, 6, 2756);
				div.className = "gmx-style-legend svelte-1uracym";
				addLoc(div, file$1, 48, 5, 2579);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);
				append(div, span0);
				append(div, text0);
				legendiconcell._mount(div, null);
				append(div, text1);
				append(div, span1);
				append(span1, text2);
				current = true;
			},

			p: function update(changed, ctx) {
				var legendiconcell_changes = {};
				if (changed.styles) legendiconcell_changes.item = ctx.it;
				if (changed.properties) legendiconcell_changes.type = ctx.properties.GeometryType;
				legendiconcell._set(legendiconcell_changes);

				if ((!current || changed.styles) && text2_value !== (text2_value = ctx.it.Name)) {
					setData(text2, text2_value);
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

	// (64:0) {#if line.content.children}
	function create_if_block$1(component, ctx) {
		var ul, ul_class_value, current;

		var each_value_1 = ctx.line.content.children || [];

		var each_blocks = [];

		for (var i = 0; i < each_value_1.length; i += 1) {
			each_blocks[i] = create_each_block(component, get_each_context_1(ctx, each_value_1, i));
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
				ul.className = ul_class_value = "group css-treeview id_" + ctx.nodeID + " " + (ctx.isOpened || ctx.isRoot ? '' : 'collapse') + " " + ctx.isRadio + " svelte-1uracym";
				addLoc(ul, file$1, 64, 1, 2919);
			},

			m: function mount(target, anchor) {
				insert(target, ul, anchor);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].i(ul, null);
				}

				component.refs.ul = ul;
				current = true;
			},

			p: function update(changed, ctx) {
				if (changed.line || changed.layersTree || changed.gmxTimeline) {
					each_value_1 = ctx.line.content.children || [];

					for (var i = 0; i < each_value_1.length; i += 1) {
						const child_ctx = get_each_context_1(ctx, each_value_1, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block(component, child_ctx);
							each_blocks[i].c();
						}
						each_blocks[i].i(ul, null);
					}
					for (; i < each_blocks.length; i += 1) outroBlock(i, 1);
				}

				if ((!current || changed.nodeID || changed.isOpened || changed.isRoot || changed.isRadio) && ul_class_value !== (ul_class_value = "group css-treeview id_" + ctx.nodeID + " " + (ctx.isOpened || ctx.isRoot ? '' : 'collapse') + " " + ctx.isRadio + " svelte-1uracym")) {
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

				if (component.refs.ul === ul) component.refs.ul = null;
			}
		};
	}

	// (66:1) {#each line.content.children || [] as child}
	function create_each_block(component, ctx) {
		var linenode_updating = {}, current;

		var linenode_initial_data = {
		 	line: ctx.child,
		 	parentProps: ctx.line.content.properties
		 };
		if (ctx.layersTree  !== void 0) {
			linenode_initial_data.layersTree = ctx.layersTree ;
			linenode_updating.layersTree = true;
		}
		if (ctx.gmxTimeline  !== void 0) {
			linenode_initial_data.gmxTimeline = ctx.gmxTimeline ;
			linenode_updating.gmxTimeline = true;
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

				if (!linenode_updating.gmxTimeline && changed.gmxTimeline) {
					newState.gmxTimeline = childState.gmxTimeline;
				}
				component._set(newState);
				linenode_updating = {};
			}
		});

		component.root._beforecreate.push(() => {
			linenode._bind({ layersTree: 1, gmxTimeline: 1 }, linenode.get());
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
				if (changed.line) linenode_changes.parentProps = ctx.line.content.properties;
				if (!linenode_updating.layersTree && changed.layersTree) {
					linenode_changes.layersTree = ctx.layersTree ;
					linenode_updating.layersTree = ctx.layersTree  !== void 0;
				}
				if (!linenode_updating.gmxTimeline && changed.gmxTimeline) {
					linenode_changes.gmxTimeline = ctx.gmxTimeline ;
					linenode_updating.gmxTimeline = ctx.gmxTimeline  !== void 0;
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

	function LineNode(options) {
		this._debugName = '<LineNode>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this.refs = {};
		this._state = assign(data$1(), options.data);

		this._recompute({ parentProps: 1, line: 1, properties: 1, layersTree: 1 }, this._state);
		if (!('parentProps' in this._state)) console.warn("<LineNode> was created without expected data property 'parentProps'");
		if (!('line' in this._state)) console.warn("<LineNode> was created without expected data property 'line'");

		if (!('layersTree' in this._state)) console.warn("<LineNode> was created without expected data property 'layersTree'");



		if (!('gmxTimeline' in this._state)) console.warn("<LineNode> was created without expected data property 'gmxTimeline'");
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
		if ('checkboxType' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'checkboxType'");
		if ('checkboxName' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'checkboxName'");
		if ('properties' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'properties'");
		if ('isGroup' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'isGroup'");
		if ('isShowCheckbox' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'isShowCheckbox'");
		if ('isInfo' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'isInfo'");
		if ('isRadio' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'isRadio'");
		if ('nodeID' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'nodeID'");
		if ('styles' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'styles'");
		if ('multiStyles' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'multiStyles'");
		if ('isRoot' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'isRoot'");
		if ('isOpened' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'isOpened'");
		if ('isGroupVisible' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'isGroupVisible'");
		if ('isVisible' in newState && !this._updatingReadonlyProperty) throw new Error("<LineNode>: Cannot set read-only property 'isVisible'");
	};

	LineNode.prototype._recompute = function _recompute(changed, state) {
		if (changed.parentProps) {
			if (this._differs(state.checkboxType, (state.checkboxType = checkboxType(state)))) changed.checkboxType = true;
			if (this._differs(state.checkboxName, (state.checkboxName = checkboxName(state)))) changed.checkboxName = true;
		}

		if (changed.line) {
			if (this._differs(state.properties, (state.properties = properties(state)))) changed.properties = true;
			if (this._differs(state.isGroup, (state.isGroup = isGroup(state)))) changed.isGroup = true;
		}

		if (changed.properties) {
			if (this._differs(state.isShowCheckbox, (state.isShowCheckbox = isShowCheckbox(state)))) changed.isShowCheckbox = true;
			if (this._differs(state.isInfo, (state.isInfo = isInfo(state)))) changed.isInfo = true;
			if (this._differs(state.isRadio, (state.isRadio = isRadio(state)))) changed.isRadio = true;
			if (this._differs(state.nodeID, (state.nodeID = nodeID(state)))) changed.nodeID = true;
			if (this._differs(state.styles, (state.styles = styles(state)))) changed.styles = true;
			if (this._differs(state.multiStyles, (state.multiStyles = multiStyles(state)))) changed.multiStyles = true;
			if (this._differs(state.isRoot, (state.isRoot = isRoot(state)))) changed.isRoot = true;
		}

		if (changed.line || changed.layersTree) {
			if (this._differs(state.isOpened, (state.isOpened = isOpened(state)))) changed.isOpened = true;
			if (this._differs(state.isGroupVisible, (state.isGroupVisible = isGroupVisible(state)))) changed.isGroupVisible = true;
			if (this._differs(state.isVisible, (state.isVisible = isVisible(state)))) changed.isVisible = true;
		}
	};

	/* src/TreeView.html generated by Svelte v2.16.1 */

	let regs = {
		cmd: /cmd:(\w+)/,
		id: /id:(\w+)/
	};
	function data$2() {
		return {
			config: {},
			layersTree: {
				visible: {},
				expanded: {}
			},
			//gmxTimeline: false,
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
				for(let i = 0; i < 10; i++) {
					if (target.classList.contains('line')) {
						out.nodeType = target.classList.contains('layer') ? 'layer' : 'group';
						out.id = this._getId(target.className);
						out.target = target;
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

		_getId(className) {
			let arr = regs.id.exec(className);
			return arr && arr.length === 2 ? arr[1] : '';
		},
		_isExistVisible(node, layersTree) {
			let cnt = 0,
				len = node.children.length; 
			for(let i = 0; i < len; i++) {
				let it = node.children[i],
					id = this._getId(it.className);
				if (layersTree.visible[id]) {
					cnt++;
				}
			}
			return cnt === 0 ? 0 :		// notVisibleLayers
				(cnt === len ? 1 :		// allVisibleLayers
				0.5);					// existsVisibleLayers
		},

		_toggleParents(node, visible, layersTree) {
			let flag = true;
			while(flag) {
				node = node.parentNode;
				if (node.classList.contains('line')) {
					let id = this._getId(node.className);
					if (id) {
						layersTree.visible[id] = visible;
					}
				} else if (node.classList.contains('group')) {
					if (!visible && this._isExistVisible(node, layersTree)) {
						flag = false;
					}
				} else {
					flag = false;
				}
			}	},

		_uncheckRadio(node, id, layersTree) {
			for(let i = 0, len = node.children.length; i < len; i++) {
				let it = node.children[i],
					pid = this._getId(it.className);
				if (pid !== id) {
					this.fire('command', { id: pid, set: false, cmd: 'toggleNode' });
					// layersTree.expanded[pid] = ph.set;
					layersTree.visible[pid] = false;
				}
			}
		},

		_iterateNodeChilds(node, visible, layersTree) {
			let id = this._getId(node.className),
				isGroup = node.classList.contains('group'),
				ul = node.getElementsByTagName('ul')[0];

			layersTree.visible[id] = visible;
			if (isGroup) {
				layersTree.expanded[id] = visible;
			} else {
				this.fire('command', { id: id, set: visible, cmd: 'toggleNode' });
			}
			if (ul) {
				let isRadio = ul.classList.contains('radio'),
					flag = visible;
				for(let i = 0, len = ul.children.length; i < len; i++) {
					let it = ul.children[i],
						pid = this._getId(it.className);
					if (isRadio && i) { flag = false; }
					this._iterateNodeChilds(it, flag, layersTree);
				}
			}
		},

		treeCommands(attr) {
			let {layersTree, rawTree} = this.get(),
				id = attr.id,
				isGroup = attr.nodeType === 'group',
				// expanded = attr.nodeType ? layersTree.expanded : layersTree.visible,
				isExpanded = !layersTree.expanded[id],
				isVisible = !layersTree.visible[id],
				options = layersTree.options[id] || {},
				ph = {
					cmd: 'toggleNode',
					type: attr.type,
					nodeType: attr.nodeType,
					originalEvent: attr.originalEvent
				};

			// console.log('treeCommands', attr.cmd, attr.nodeType);

			if (attr.cmd === 'clickOnExpander') {
				layersTree.expanded[id] = !layersTree.expanded[id];
				this.set({layersTree: layersTree});
			} else if (attr.cmd === 'toggleGroup') {
				this._iterateNodeChilds(attr.target, isVisible, layersTree);
				this._toggleParents(attr.target, isExpanded, layersTree);

				this.set({layersTree: layersTree});
			} else if (attr.cmd === 'toggleVisibility') {
				let node = attr.target,
					isGroup = node.getElementsByClassName('expanderInput')[0],
					expanded = isGroup ? layersTree.expanded : layersTree.visible,
					ul = node.parentNode;

				if (expanded[id]) {
					delete expanded[id];
				} else {
					expanded[id] = true;
				}
				if (ul && ul.classList.contains('radio')) {
					this._uncheckRadio(ul, id, layersTree);
				}
				this._toggleParents(attr.target, expanded[id], layersTree);
				this.set({layersTree: layersTree});
				return true;
			}
			return false;
		},

		appendNode(id) {
			this.options.appendNode(id);
		}
	};

	const file$2 = "src/TreeView.html";

	function create_main_fragment$2(component, ctx) {
		var div, linenode_updating = {}, current;

		var linenode_initial_data = { line: ctx.rawTree, parentProps: ctx.rawTree.content.properties };
		if (ctx.layersTree  !== void 0) {
			linenode_initial_data.layersTree = ctx.layersTree ;
			linenode_updating.layersTree = true;
		}
		if (ctx.gmxTimeline  !== void 0) {
			linenode_initial_data.gmxTimeline = ctx.gmxTimeline ;
			linenode_updating.gmxTimeline = true;
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

				if (!linenode_updating.gmxTimeline && changed.gmxTimeline) {
					newState.gmxTimeline = childState.gmxTimeline;
				}
				component._set(newState);
				linenode_updating = {};
			}
		});

		component.root._beforecreate.push(() => {
			linenode._bind({ layersTree: 1, gmxTimeline: 1 }, linenode.get());
		});

		function click_handler(event) {
			component.chkEvent(event);
		}

		return {
			c: function create() {
				div = createElement("div");
				linenode._fragment.c();
				addListener(div, "click", click_handler);
				div.className = "TreeView svelte-147f2mc";
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
				if (changed.rawTree) linenode_changes.parentProps = ctx.rawTree.content.properties;
				if (!linenode_updating.layersTree && changed.layersTree) {
					linenode_changes.layersTree = ctx.layersTree ;
					linenode_updating.layersTree = ctx.layersTree  !== void 0;
				}
				if (!linenode_updating.gmxTimeline && changed.gmxTimeline) {
					linenode_changes.gmxTimeline = ctx.gmxTimeline ;
					linenode_updating.gmxTimeline = ctx.gmxTimeline  !== void 0;
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
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign(data$2(), options.data);
		if (!('rawTree' in this._state)) console.warn("<TreeView> was created without expected data property 'rawTree'");
		if (!('layersTree' in this._state)) console.warn("<TreeView> was created without expected data property 'layersTree'");
		if (!('gmxTimeline' in this._state)) console.warn("<TreeView> was created without expected data property 'gmxTimeline'");
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

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var EventTarget = function () {
	    function EventTarget() {
	        classCallCheck(this, EventTarget);

	        this.listeners = {};
	    }

	    createClass(EventTarget, [{
	        key: 'addEventListener',
	        value: function addEventListener(type, callback) {
	            if (!(type in this.listeners)) {
	                this.listeners[type] = [];
	            }
	            this.listeners[type].push(callback);
	        }
	    }, {
	        key: 'on',
	        value: function on(type, callback) {
	            this.addEventListener(type, callback);
	            return this;
	        }
	    }, {
	        key: 'removeEventListener',
	        value: function removeEventListener(type, callback) {
	            if (!(type in this.listeners)) {
	                return;
	            }
	            var stack = this.listeners[type];
	            for (var i = 0, l = stack.length; i < l; i++) {
	                if (stack[i] === callback) {
	                    stack.splice(i, 1);
	                    return this.removeEventListener(type, callback);
	                }
	            }
	        }
	    }, {
	        key: 'off',
	        value: function off(type, callback) {
	            this.removeEventListener(type, callback);
	            return this;
	        }
	    }, {
	        key: 'dispatchEvent',
	        value: function dispatchEvent(event) {
	            if (!(event.type in this.listeners)) {
	                return;
	            }
	            var stack = this.listeners[event.type];
	            Object.defineProperty(event, 'target', {
	                enumerable: false,
	                configurable: false,
	                writable: false,
	                value: this
	            });
	            for (var i = 0, l = stack.length; i < l; i++) {
	                stack[i].call(this, event);
	            }
	        }
	    }]);
	    return EventTarget;
	}();

	class Sidebar extends EventTarget {
	    constructor(container, { position = 'left' } = {}) {
	        super();
	        this._container = container;
	        this._container.innerHTML = `<div class="scanex-sidebar">
            <div class="${position === 'left' ? 'tabs' : 'panes'}"></div>
            <div class="${position === 'left' ? 'panes' : 'tabs'}"></div>
        </div>`;

	        this._tabContainer = this._container.querySelector('.tabs');
	        this._paneContainer = this._container.querySelector('.panes');

	        this._current = null;
	        this._data = {};
	    }
	    enable(id) {
	        if (this._data[id]) {
	            this._data[id].enabled = true;
	        }
	    }
	    enabled(id) {
	        const { enabled } = id && this._data[id] ? this._data[id] : { enabled: false };
	        return enabled;
	    }
	    disable(id) {
	        if (this._data[id]) {
	            if (id === this.current) {
	                this.current = null;
	            }
	            this._data[id].enabled = false;
	        }
	    }
	    get current() {
	        return this._current;
	    }
	    set current(current) {
	        const tabs = this._tabContainer.children;
	        const panes = this._paneContainer.children;
	        let success = false;

	        for (let i = 0; i < tabs.length; ++i) {
	            const id = tabs[i].getAttribute('data-tab-id');
	            const { opened, closed, enabled } = this._data[id];
	            let tab = tabs[i].querySelector('i');
	            let pane = panes[i];
	            if (id === current) {
	                tab.classList.remove(closed);
	                tab.classList.add(opened);

	                pane.classList.remove('hidden');
	                pane.classList.add('shown');

	                success = true;
	            } else {
	                tab.classList.remove(opened);
	                tab.classList.add(closed);

	                pane.classList.remove('shown');
	                pane.classList.add('hidden');
	            }
	        }
	        this._current = success ? current : null;
	        let event = document.createEvent('Event');
	        event.detail = { current: this._current };
	        event.initEvent('change', false, false);
	        this.dispatchEvent(event);
	    }
	    addTab({ id, icon, opened, closed, tooltip, enabled = true }) {
	        let tab = document.createElement('div');
	        let ic = document.createElement('i');
	        icon.split(/\s+/g).forEach(x => ic.classList.add(x));
	        ic.classList.add(id === this._current ? opened : closed);
	        tab.appendChild(ic);
	        tab.setAttribute('data-tab-id', id);
	        if (tooltip) {
	            tab.setAttribute('title', tooltip);
	        }
	        tab.addEventListener('click', this._toggle.bind(this, id));
	        this._tabContainer.appendChild(tab);

	        let pane = document.createElement('div');
	        pane.setAttribute('data-pane-id', id);
	        pane.classList.add(this.visible && this.current === id ? 'shown' : 'hidden');
	        this._paneContainer.appendChild(pane);

	        this._data[id] = { icon, opened, closed, enabled };

	        return pane;
	    }
	    removeTab(id) {
	        const tab = this._tabContainer.querySelector(`[data-tab-id=${id}]`);
	        tab.removeEventListener('click', this._toggle.bind(this, id));
	        this._tabContainer.removeChild(tab);

	        const pane = this._paneContainer.querySelector(`[data-pane-id=${id}]`);
	        this._paneContainer.removeChild(pane);

	        for (let i = 0; i < this._data.length; ++i) {
	            if (this._data[i].id === id) {
	                this._data.splice(i, 1);
	                break;
	            }
	        }
	    }
	    _toggle(current) {
	        if (this.enabled(current)) {
	            this.current = this.current === current ? null : current;
	        }
	    }
	    getPane(id) {
	        return this._paneContainer.querySelector(`[data-pane-id=${id}]`);
	    }
	}

	let SidebarControl = L.Control.extend({
	    includes: L.Evented ? L.Evented.prototype : L.Mixin.Events,

	    initialize: function (options) {
	        L.setOptions(this, options);
	    },

	    enable: function (id) {
	        this._sidebar.enable(id);
	    },

	    enabled: function (id) {
	        return this._sidebar.enabled(id);
	    },

	    disable: function (id) {
	        this._sidebar.disable(id);
	    },

	    getCurrent: function () {
	        return this._sidebar.current;
	    },

	    setCurrent: function (current) {
	        this._sidebar.current = current;
	    },

	    addTab: function ({ id, icon, opened, closed, tooltip, enabled }) {
	        return this._sidebar.addTab({ id, icon, opened, closed, tooltip, enabled });
	    },

	    removeTab: function (id) {
	        this._sidebar.removeTab(id);
	    },

	    getPane: function (id) {
	        return this._sidebar.getPane(id);
	    },

	    onAdd: function (map) {
	        this._container = L.DomUtil.create('div');
	        const stop = L.DomEvent.stopPropagation;
	        const fakeStop = L.DomEvent._fakeStop || stop;
	        L.DomEvent.on(this._container, 'contextmenu', stop).on(this._container, 'click', fakeStop).on(this._container, 'mousedown', stop).on(this._container, 'touchstart', stop).on(this._container, 'dblclick', fakeStop).on(this._container, 'mousewheel', stop).on(this._container, 'MozMousePixelScroll', stop);
	        const { position } = this.options;
	        this._sidebar = new Sidebar(this._container, { position: position === 'topleft' || position === 'bottomleft' ? 'left' : 'right' });
	        this._sidebar.addEventListener('change', e => {
	            this.fire('change', e);
	        });
	        return this._container;
	    },

	    addTo: function (map) {
	        L.Control.prototype.addTo.call(this, map);
	        if (this.options.addBefore) {
	            this.addBefore(this.options.addBefore);
	        }
	        return this;
	    },

	    addBefore: function (id) {
	        let parentNode = this._parent && this._parent._container;
	        if (!parentNode) {
	            parentNode = this._map && this._map._controlCorners[this.getPosition()];
	        }
	        if (!parentNode) {
	            this.options.addBefore = id;
	        } else {
	            for (let i = 0, len = parentNode.childNodes.length; i < len; i++) {
	                let it = parentNode.childNodes[i];
	                if (id === it._id) {
	                    parentNode.insertBefore(this._container, it);
	                    break;
	                }
	            }
	        }
	        return this;
	    }
	});

	var scanexLeafletSidebar_cjs = SidebarControl;

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var iconLayers = createCommonjsModule(function (module) {
	/*eslint-env commonjs, browser */
	(function(factory) {
	    if (module.exports) {
	        module.exports = factory(leaflet);
	    } else {
	        window.L.control.iconLayers = factory(window.L);
	        window.L.Control.IconLayers = window.L.control.iconLayers.Constructor;
	    }
	})(function(L) {
	    function each(o, cb) {
	        for (var p in o) {
	            if (o.hasOwnProperty(p)) {
	                cb(o[p], p, o);
	            }
	        }
	    }

	    function find(ar, cb) {
	        if (ar.length) {
	            for (var i = 0; i < ar.length; i++) {
	                if (cb(ar[i])) {
	                    return ar[i];
	                }
	            }
	        } else {
	            for (var p in ar) {
	                if (ar.hasOwnProperty(p) && cb(ar[p])) {
	                    return ar[p];
	                }
	            }
	        }
	    }

	    function first(o) {
	        for (var p in o) {
	            if (o.hasOwnProperty(p)) {
	                return o[p];
	            }
	        }
	    }

	    function length(o) {
	        var length = 0;
	        for (var p in o) {
	            if (o.hasOwnProperty(p)) {
	                length++;
	            }
	        }
	        return length;
	    }

	    function prepend(parent, el) {
	        if (parent.children.length) {
	            parent.insertBefore(el, parent.children[0]);
	        } else {
	            parent.appendChild(el);
	        }
	    }

	    var IconLayers = L.Control.extend({

	        includes: L.Evented ? L.Evented.prototype : L.Mixin.Events,
	        _getActiveLayer: function() {
	            if (this._activeLayerId) {
	                return this._layers[this._activeLayerId];
	            } else if (length(this._layers)) {
	                return first(this._layers);
	            } else {
	                return null;
	            }
	        },
	        _getPreviousLayer: function() {
	            var activeLayer = this._getActiveLayer();
	            if (!activeLayer) {
	                return null;
	            } else if (this._previousLayerId) {
	                return this._layers[this._previousLayerId];
	            } else {
	                return find(this._layers, function(l) {
	                    return l.id !== activeLayer.id;
	                }.bind(this)) || null;
	            }
	        },
	        _getInactiveLayers: function() {
	            var ar = [];
	            var activeLayerId = this._getActiveLayer() ? this._getActiveLayer().id : null;
	            var previousLayerId = this._getPreviousLayer() ? this._getPreviousLayer().id : null;
	            each(this._layers, function(l) {
	                if ((l.id !== activeLayerId) && (l.id !== previousLayerId)) {
	                    ar.push(l);
	                }
	            });
	            return ar;
	        },
	        _arrangeLayers: function() {
	            var behaviors = {};
	            behaviors.previous = function() {
	                var layers = this._getInactiveLayers();
	                if (this._getActiveLayer()) {
	                    layers.unshift(this._getActiveLayer());
	                }
	                if (this._getPreviousLayer()) {
	                    layers.unshift(this._getPreviousLayer());
	                }
	                return layers;
	            };
	            return behaviors[this.options.behavior].apply(this, arguments);
	        },
	        _getLayerCellByLayerId: function(id) {
	            var els = this._container.getElementsByClassName('leaflet-iconLayers-layerCell');
	            for (var i = 0; i < els.length; i++) {
	                if (els[i].getAttribute('data-layerid') == id) {
	                    return els[i];
	                }
	            }
	        },
	        _createLayerElement: function(layerObj) {
	            var el = L.DomUtil.create('div', 'leaflet-iconLayers-layer');
	            if (layerObj.title) {
	                var titleContainerEl = L.DomUtil.create('div', 'leaflet-iconLayers-layerTitleContainer');
	                var titleEl = L.DomUtil.create('div', 'leaflet-iconLayers-layerTitle');
	                var checkIconEl = L.DomUtil.create('div', 'leaflet-iconLayers-layerCheckIcon');
	                titleEl.innerHTML = layerObj.title;
	                titleContainerEl.appendChild(titleEl);
	                el.appendChild(titleContainerEl);
	                el.appendChild(checkIconEl);
	            }
	            if (layerObj.icon) {
	                el.setAttribute('style', 'background-image: url(\'' + layerObj.icon + '\')');
	            }
	            return el;
	        },
	        _createLayerElements: function() {
	            var currentRow, layerCell;
	            var layers = this._arrangeLayers();
	            var activeLayerId = this._getActiveLayer() && this._getActiveLayer().id;

	            for (var i = 0; i < layers.length; i++) {
	                if (i % this.options.maxLayersInRow === 0) {
	                    currentRow = L.DomUtil.create('div', 'leaflet-iconLayers-layersRow');
	                    if (this.options.position.indexOf('bottom') === -1) {
	                        this._container.appendChild(currentRow);
	                    } else {
	                        prepend(this._container, currentRow);
	                    }
	                }
	                layerCell = L.DomUtil.create('div', 'leaflet-iconLayers-layerCell');
	                layerCell.setAttribute('data-layerid', layers[i].id);
	                if (i !== 0) {
	                    L.DomUtil.addClass(layerCell, 'leaflet-iconLayers-layerCell_hidden');
	                }
	                if (layers[i].id === activeLayerId) {
	                    L.DomUtil.addClass(layerCell, 'leaflet-iconLayers-layerCell_active');
	                }
	                if (this._expandDirection === 'left') {
	                    L.DomUtil.addClass(layerCell, 'leaflet-iconLayers-layerCell_expandLeft');
	                } else {
	                    L.DomUtil.addClass(layerCell, 'leaflet-iconLayers-layerCell_expandRight');
	                }
	                layerCell.appendChild(this._createLayerElement(layers[i]));

	                if (this.options.position.indexOf('right') === -1) {
	                    currentRow.appendChild(layerCell);
	                } else {
	                    prepend(currentRow, layerCell);
	                }
	            }
	        },
	        _onLayerClick: function(e) {
	            e.stopPropagation();
	            var layerId = e.currentTarget.getAttribute('data-layerid');
	            var layer = this._layers[layerId];
	            this.setActiveLayer(layer.layer);
	            this.expand();
	        },
	        _attachEvents: function() {
	            each(this._layers, function(l) {
	                var e = this._getLayerCellByLayerId(l.id);
	                if (e) {
	                    e.addEventListener('click', this._onLayerClick.bind(this));
	                }
	            }.bind(this));
	            var layersRowCollection = this._container.getElementsByClassName('leaflet-iconLayers-layersRow');

	            var onMouseEnter = function(e) {
	                e.stopPropagation();
	                this.expand();
	            }.bind(this);

	            var onMouseLeave = function(e) {
	                e.stopPropagation();
	                this.collapse();
	            }.bind(this);

	            var stopPropagation = function(e) {
	                e.stopPropagation();
	            };

	            //TODO Don't make functions within a loop.
	            for (var i = 0; i < layersRowCollection.length; i++) {
	                var el = layersRowCollection[i];
	                el.addEventListener('mouseenter', onMouseEnter);
	                el.addEventListener('mouseleave', onMouseLeave);
	                el.addEventListener('mousemove', stopPropagation);
	            }
	        },
	        _render: function() {
	            this._container.innerHTML = '';
	            this._createLayerElements();
	            this._attachEvents();
	        },
	        _switchMapLayers: function() {
	            if (!this._map) {
	                return;
	            }
	            var activeLayer = this._getActiveLayer();
	            var previousLayer = this._getPreviousLayer();
	            if (previousLayer) {
	                this._map.removeLayer(previousLayer.layer);
	            } else {
	                each(this._layers, function(layerObject) {
	                    var layer = layerObject.layer;
	                    this._map.removeLayer(layer);
	                }.bind(this));
	            }
	            if (activeLayer) {
	                this._map.addLayer(activeLayer.layer);
	            }
	        },
	        options: {
	            position: 'bottomleft', // one of expanding directions depends on this
	            behavior: 'previous', // may be 'previous', 'expanded' or 'first'
	            expand: 'horizontal', // or 'vertical'
	            autoZIndex: true, // from L.Control.Layers
	            maxLayersInRow: 5,
	            manageLayers: true
	        },
	        initialize: function(layers, options) {
	            if (!L.Util.isArray(arguments[0])) {
	                // first argument is options
	                options = layers;
	                layers = [];
	            }
	            L.setOptions(this, options);
	            this._expandDirection = (this.options.position.indexOf('left') != -1) ? 'right' : 'left';
	            if (this.options.manageLayers) {
	                this.on('activelayerchange', this._switchMapLayers, this);
	            }
	            this.setLayers(layers);
	        },
	        onAdd: function(map) {
	            this._container = L.DomUtil.create('div', 'leaflet-iconLayers');
	            L.DomUtil.addClass(this._container, 'leaflet-iconLayers_' + this.options.position);
	            this._render();
	            map.on('click', this.collapse, this);
	            if (this.options.manageLayers) {
	                this._switchMapLayers();
	            }
	            return this._container;
	        },
	        onRemove: function(map) {
	            map.off('click', this.collapse, this);
	        },
	        setLayers: function(layers) {
	            this._layers = {};
	            layers.map(function(layer) {
	                var id = L.stamp(layer.layer);
	                this._layers[id] = L.extend(layer, {
	                    id: id
	                });
	            }.bind(this));
	            if (this._container) {
	                this._render();
	            }
	        },
	        setActiveLayer: function(layer) {
	            var l = layer && this._layers[L.stamp(layer)];
	            if (!l || l.id === this._activeLayerId) {
	                return;
	            }
	            this._previousLayerId = this._activeLayerId;
	            this._activeLayerId = l.id;
	            if (this._container) {
	                this._render();
	            }
	            this.fire('activelayerchange', {
	                layer: layer
	            });
	        },
	        expand: function() {
	            this._arrangeLayers().slice(1).map(function(l) {
	                var el = this._getLayerCellByLayerId(l.id);
	                L.DomUtil.removeClass(el, 'leaflet-iconLayers-layerCell_hidden');
	            }.bind(this));
	        },
	        collapse: function() {
	            this._arrangeLayers().slice(1).map(function(l) {
	                var el = this._getLayerCellByLayerId(l.id);
	                L.DomUtil.addClass(el, 'leaflet-iconLayers-layerCell_hidden');
	            }.bind(this));
	        }
	    });

	    var iconLayers = function(layers, options) {
	        return new IconLayers(layers, options);
	    };

	    iconLayers.Constructor = IconLayers;

	    return iconLayers;
	});
	});

	/* src/Map.html generated by Svelte v2.16.1 */




	const serverBase = window.serverBase || '//maps.kosmosnimki.ru/';

	function data$3() {
		return {
			layersTree: {
				options: {},
				visible: {},
				expanded: {}
			},
			permalink: null,
			map: null
		}
	}
	var methods$2 = {
		createMap(it) {
			let {layersTree} = this.get();
			let app = it.app || {},
				gmxMap = app.gmxMap || {},
				state = it.state || {},
				// layersTree = state.layersTree || {},
				calendar = state.calendar || {},
				mapID = gmxMap.mapID || '946GH',
				apiKey = gmxMap.apiKey || 'Z2SSNR87N4',
				pos = state.map ? state.map.position : {};

			// console.log('createMap', it)
			if(app.theme) {
				document.body.classList.add(app.theme);
			}
			if(navigator.platform.match('Mac') !== null) {
				document.body.classList.add('OSX');
			}
			if(L.leafletMap) {
				L.leafletMap.remove();
			}

			layersTree = state.layersTree || layersTree;
			layersTree.options = layersTree.options || {};
			this.layersTree = layersTree;
			let map = new L.Map('map', {
				srs: 3857,
				layers: [],
				center: new L.LatLng(pos.y || 0, pos.x || 60),
				zoom: pos.z || 3
			});
			L.leafletMap = map;

			map.gmxControlsManager.init({
				gmxDrawing: !app.drawing || app.drawing === 'false' ? null : {position: 'right'},
				gmxZoom: {position: 'gmxbottomright'},
				gmxLoaderStatus: {position: 'gmxbottomright'},
				gmxHide: null
			});
			map.gmxControlsManager.setSvgSprites('//www.kosmosnimki.ru/lib/geomixer_1.3/img/svg-symbols.svg');

			if (app.iconSidebar && app.iconSidebar !== 'false') {
				var iconSidebar = new scanexLeafletSidebar_cjs({position: 'topleft', className: 'sidebarControl'});
				iconSidebar.addTo(map);
				iconSidebar.getContainer().classList.add('sidebarControl');

				this.iconSidebar = iconSidebar;
				if (app.treeView && app.treeView !== 'false') {
					var treePane = iconSidebar.addTab({id: 'treeView', icon: 'icon-layers', opened: 'opened', closed: 'closed'});
					this.treePane = treePane;
				}
			} else {
				document.body.classList.add('noIconSidebar');
			}

			this.mapID = mapID;
			let opt = {
				leafletMap: map,
				apiKey: apiKey,
				// visibleItemOnly: true,	// TODO: только видимые элементы (слои и папки) баги серверного скрипта
				setZIndex: true
				// ,
				// visibility: layersTree.visible || {}
			};
			L.gmx.loadMap(mapID, opt).then(function(gmxMap) {
				this.gmxMap = gmxMap;
				let dateInterval = state.calendar || {},
					tb = dateInterval.dateBegin,
					te = dateInterval.dateEnd;
				if(!tb) {
					let day = 1000*60*60*24,
						cd = new Date();
					tb = Date.UTC(cd.getUTCFullYear(), cd.getUTCMonth(), cd.getUTCDate());
					te = tb + day;
				}
				let db = new Date(tb), de = new Date(te);
				gmxMap.layers.forEach((it) => {
					if(it.getGmxProperties) {
						let props = it.getGmxProperties(),
							id = props.name;
						if(it.setDateInterval) {
							it.setDateInterval(db, de);
						}
						if(id in layersTree.visible) {
							map[layersTree.visible[id] ? 'addLayer' : 'removeLayer'](it);
						}
					}
				});
				L.gmx.gmxMapManager.iterateNode(gmxMap.rawTree, function(node, prnt) {
					let props = node.content.properties,
						id = props.name || props.GroupID;
					if (props.GroupID) {
						if (props.expanded && !(id in layersTree.expanded)) {
							layersTree.expanded[id] = props.expanded;
						}
						if (props.visible && !(id in layersTree.visible)) {
							layersTree.visible[id] = props.visible;
						}
					} else {
						if (props.visible && !(id in layersTree.visible)) {
							layersTree.visible[id] = props.visible;
						}
						let prntProps = prnt.properties;
						if (prntProps.GroupID && prntProps.list) {
							let opt = layersTree.options[id] || {};
							opt.list = prntProps.list;
							layersTree.options[id]  = opt;
						}
					}
				}, {nodes: gmxMap.nodes});

				// this.set({layersTree: layersTree}); 
				// this.set({gmxMap: gmxMap}); 
				let shiftIconLayers = false,
					repaintTimeline = null;

				if (app.gmxTimeline && app.gmxTimeline !== 'false') {
					/* TimeLine */
					var control = L.control.gmxTimeline({
						moveable: true
						}).on('dateInterval', function (ev) {
							gmxMap.layersByID[ev.layerID].setDateInterval(ev.beginDate, ev.endDate);
						})
						.on('statechanged', function () {
							repaintTimeline();
						})
						.on('click', function (ev) {
							gmxMap.layersByID[ev.layerID].repaint();
						});
					this.gmxTimeline = control;
					repaintTimeline = () => {
						if (control._container) {
							control._container.classList[shiftIconLayers ? 'add' : 'remove']('shiftTimeline');
							control._redrawTimeline();
						}
					};
					map
						.on('layerremove', function (ev) {
							let layer = ev.layer,
								props = layer && layer.getGmxProperties && layer.getGmxProperties();
							if (props && props.name) {
								layersTree.visible[props.name] = false;
								if (this._treeView) {
									this._treeView.set({layersTree: layersTree}); 
								}
							}
						}, this)
						.on('layeradd', function (ev) {
							let layer = ev.layer,
								props = layer && layer.getGmxProperties && layer.getGmxProperties();
							if (props && props.name) {
								layersTree.visible[props.name] = true;
								if (this._treeView) {
									this._treeView.set({layersTree: layersTree}); 
								}
							}
						}, this);
				}

				if (this.iconSidebar) {
					let triggerSidebar = (id) => {
						
						if (id === 'treeView') {
							shiftIconLayers = true;
							if (treePane) {
								this._initTree({container: treePane, layersTree: layersTree, rawTree: gmxMap.rawTree, gmxTimeline: this.gmxTimeline});
							}
						} else {
							shiftIconLayers = false;
							if (treePane) {
								treePane.innerHTML = '';
							}
						}
						if (this.IconLayersContainer) {
							this.IconLayersContainer.classList[shiftIconLayers ? 'add' : 'remove']('shiftIconLayers');
						}
						if (repaintTimeline) {
							repaintTimeline();
						}
					};
					this.iconSidebar.on('change', e => triggerSidebar(e.detail.current));
				}

				let bLayersConf = state.baseLayersManager || { activeIDs: gmxMap.properties.BaseLayers };
				this._initBaseLayers(map, bLayersConf, app);
			}.bind(this))
			.catch(console.log);
			this.set({map: map, config: it});
		},
		_initBaseLayers(map, baseLayers, app) {
			const lang = 'rus';
			let blm = map.gmxBaseLayersManager,
				activeIDs = baseLayers.activeIDs || ['sputnik'],
				currentID = baseLayers.currentID || activeIDs[0];
			blm.initDefaults().then(function() {
				blm.setActiveIDs(activeIDs);
				let layers = blm.getActiveIDs().map(id => {
					var layer = blm.get(id);
					if (!layer) {
						return null;
					} else {
						return {
							layer: layer,
							icon: layer.options.icon,
							title: layer.options[lang]
						}
					}
				}).filter(e => e);

				if (app.iconLayers && app.iconLayers !== 'false') {
					let baseLayersControl = new iconLayers(layers, {id: 'iconLayers'});
					map.gmxControlsManager.add(baseLayersControl);
					map.addControl(baseLayersControl);
					baseLayersControl.setActiveLayer(blm.get(currentID));
					this.IconLayersContainer = baseLayersControl.getContainer();
				}
				blm.setCurrentID(currentID);
				if (app.treeView === 'opened' && this.iconSidebar) { this.iconSidebar.setCurrent('treeView'); }
			}.bind(this));
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
			let rawTree = {
				type: 'map',
				content: it.rawTree
			};
			this._treeView = new TreeView({
				appendNode: (id) => {	// TODO: только видимые элементы (слои и папки) баги серверного скрипта
					return;
					/*
					if (this.gmxMap.nodes) {
						let {map} = this.get();
						let mapID = this.mapID,
							layersTree = this.layersTree,
							visible = layersTree.visible || {},
							// mapItem = L.gmx._maps['maps.kosmosnimki.ru'][mapID],
							gmxMap = this.gmxMap,
							layersByID = gmxMap.layersByID;
						L.gmx.gmxMapManager.getMapFolder({
							treeConfig: layersTree,
							mapId: mapID,
							folderId: id
						}).then(function(json) {
							L.gmx.gmxMapManager.iterateNode(json.content, function(node) {
								let props = node.content.properties,
									layerId = props.name;
								if (layerId && layerId in visible && visible[layerId] !== props.visible) {
									props.visible = visible[layerId];
								}
							}, {nodes: gmxMap.nodes});
							gmxMap.addLayersToMap(map);
							this.treePane.innerHTML = '';
							this._initTree({
								container: this.treePane,
								layersTree: this.layersTree,
								rawTree: gmxMap.rawTree
							});

						}.bind(this));
					}
					*/
				},
				target: it.container,
				data: {
					container: it.container,
					layersTree: it.layersTree,
					gmxTimeline: it.gmxTimeline ? true : false,
					rawTree: rawTree
				}
			});

			this._treeView.on('command', (ev) => {
				let {map} = this.get();
				let cmd = ev.cmd,
					target = ev.originalEvent ? ev.originalEvent.target : null,
					layersTree = this.layersTree,
					gmxMap = this.gmxMap,
					node = gmxMap.nodes ? gmxMap.nodes[ev.id] : true,
					gmxLayer = gmxMap.layersByID[ev.id];

				// console.log('Map command', ev, this.layersTree);
				if (gmxLayer && !(gmxLayer instanceof L.gmx.DummyLayer)) {
					if (cmd === 'fitBounds') {
						if (gmxLayer.getBounds) {
							let bounds = gmxLayer.getBounds();
								// zoom = map.getBoundsZoom(bounds),
								// opt = gmxLayer.options;
							// zoom = zoom < opt.minZoom ? opt.minZoom : (zoom > opt.maxZoom ? opt.maxZoom : zoom);
							// map.setView(bounds.getCenter(), zoom);

							map.fitBounds(bounds, {	// maxZoom от М.Потанина
								animation: false,
								maxZoom: Math.min(Math.max(15, map.getZoom()), map.getBoundsZoom(bounds))
							});
						}
					} else if (cmd === 'showInfo') {
						let props = gmxLayer.getGmxProperties(),
							meta = props.MetaProperties,
							getContent = () => {
								if (meta.desc_long) {
									return meta.desc_long.Value;
								} else if (Object.keys(meta).length) {
									let arr = [];
									for(let key in meta) {
										arr.push('<tr><td class="key"><span>' + key + '</span></td><td><div>' + meta[key].Value + '</div></td></tr>');
									}
									return '<table class="vectorInfoParams"><tbody>' + arr.join('') + '</tbody></table>';
								}
								return;
							},
							desc = getContent();

						if (desc) {
							
							map.gmxControlsManager.add(L.control.gmxPopup({content: desc}).openOn(map));
	/*
							let popup = L.popup(),
								latlng = map.getCenter(),
								onAdd = () => {
									let ww = 300,
										maxChild = null,
										h = L.point(0,0),
										offset = [0, 0],
										container = popup._contentNode,
										arr = container.childNodes;
									for(let i = 0, len = arr.length; i < len; i++) {
										let it = arr[i],
											w = it.clientWidth;
										if (w > ww) {
											maxChild = it;
											ww = w;
										}
									}
									if (maxChild) {
										popup.options.maxHeight = map.getContainer().clientHeight - 100;
										popup.options.maxWidth = maxChild.clientWidth;
										popup.options.offset = L.point(maxChild.clientWidth / 2, container.clientHeight / 2);
										popup
											.remove()
											.off('add', onAdd, this)
											.openOn(map);
									}
								};
								
							popup
								.on('add', onAdd, this)
								.setLatLng(latlng)
								.setContent(desc)
								.openOn(map);
								*/
						}
					} else if (cmd === 'toggleNode') {
						let flag = ev.set;
						if (flag) {
							if (!gmxLayer._map) {
								map.addLayer(gmxLayer);
							}
						} else {
							if (gmxLayer._map) {
								map.removeLayer(gmxLayer);
							}
						}
					} else if (cmd === 'toggleVisibility') {
						if (gmxLayer._map) {
							map.removeLayer(gmxLayer);
						} else {
							map.addLayer(gmxLayer);
						}
					} else if (cmd === 'toggleTimeline' && this.gmxTimeline) {
						if (target.classList.contains('enabled')) {
							if (!this.gmxTimeline._map) {
								map.addControl(this.gmxTimeline);
							}
							this.gmxTimeline.addLayer(gmxLayer);
						} else {
							this.gmxTimeline.removeLayer(gmxLayer);
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
				} else {
					if (cmd === 'toggleVisibility' && !node) {
						this._treeView.appendNode(ev.id);
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
	const file$3 = "src/Map.html";

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
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

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

	/* src/Share.html generated by Svelte v2.16.1 */

	function link({ conf }) {
		return '//winnie.kosmosnimki.ru/2.0/?config=' + conf;
	}

	function data$4() {
		return {
			frameWidth: 800,
			frameHeight: 600,
			conf: 'R6UIY',
			title: ''
		}
	}
	const file$4 = "src/Share.html";

	function create_main_fragment$4(component, ctx) {
		var div14, div0, text0, text1, div13, div12, div11, div1, span0, text3, a0, i0, a0_href_value, text4, a1, i1, a1_href_value, text5, a2, i2, a2_href_value, text6, div3, div2, input0, text7, a3, i3, text8, div4, text10, div6, div5, input1, text11, span1, text13, input2, text14, span3, span2, i4, text16, span4, a4, text17, a4_href_value, i5, text18, div9, textarea, textarea_value_value, text19, div8, div7, text20, div10, span5, a5, text21, a5_href_value, i6, current;

		var if_block = (ctx.title) && create_if_block$2(component, ctx);

		function change_handler(event) {
			component.set({frameWidth: this.value});
		}

		function change_handler_1(event) {
			component.set({frameHeight: this.value});
		}

		return {
			c: function create() {
				div14 = createElement("div");
				div0 = createElement("div");
				text0 = createText("\n\t");
				if (if_block) if_block.c();
				text1 = createText("\n\t");
				div13 = createElement("div");
				div12 = createElement("div");
				div11 = createElement("div");
				div1 = createElement("div");
				span0 = createElement("span");
				span0.textContent = "Ссылка на карту:";
				text3 = createText("\n\t\t\t\t\t");
				a0 = createElement("a");
				i0 = createElement("i");
				text4 = createText("\n\t\t\t\t\t");
				a1 = createElement("a");
				i1 = createElement("i");
				text5 = createText("\n\t\t\t\t\t");
				a2 = createElement("a");
				i2 = createElement("i");
				text6 = createText("\n\t\t\t\t");
				div3 = createElement("div");
				div2 = createElement("div");
				input0 = createElement("input");
				text7 = createText("\n\t\t\t\t\t\t");
				a3 = createElement("a");
				i3 = createElement("i");
				text8 = createText("\n\t\t\t\t");
				div4 = createElement("div");
				div4.textContent = "Код для вставки:";
				text10 = createText("\n\t\t\t\t");
				div6 = createElement("div");
				div5 = createElement("div");
				input1 = createElement("input");
				text11 = createText("\n\t\t\t\t\t\t\t");
				span1 = createElement("span");
				span1.textContent = "x";
				text13 = createText("\n\t\t\t\t\t\t\t");
				input2 = createElement("input");
				text14 = createText("\n\t\t\t\t\t\t");
				span3 = createElement("span");
				span2 = createElement("span");
				span2.textContent = "предпросмотр";
				i4 = createElement("i");
				text16 = createText("\n\t\t\t\t\t\t");
				span4 = createElement("span");
				a4 = createElement("a");
				text17 = createText("конструктор приложений");
				i5 = createElement("i");
				text18 = createText("\n\t\t\t\t");
				div9 = createElement("div");
				textarea = createElement("textarea");
				text19 = createText("\n\t\t\t\t\t");
				div8 = createElement("div");
				div7 = createElement("div");
				text20 = createText("\n\t\t\t\t");
				div10 = createElement("div");
				span5 = createElement("span");
				a5 = createElement("a");
				text21 = createText("предпросмотр");
				i6 = createElement("i");
				div0.className = "arrow svelte-1cva6jy";
				addLoc(div0, file$4, 1, 1, 21);
				span0.className = "bold svelte-1cva6jy";
				addLoc(span0, file$4, 7, 5, 257);
				i0.className = "icon-twitter svelte-1cva6jy";
				addLoc(i0, file$4, 8, 88, 388);
				a0.className = "gmx-link_icon svelte-1cva6jy";
				a0.target = "_blank";
				a0.href = a0_href_value = "//www.twitter.com/share?url=" + ctx.link;
				addLoc(a0, file$4, 8, 5, 305);
				i1.className = "icon-facebook svelte-1cva6jy";
				addLoc(i1, file$4, 9, 105, 526);
				a1.className = "gmx-link_icon svelte-1cva6jy";
				a1.target = "_blank";
				a1.href = a1_href_value = "https://www.facebook.com/sharer/sharer.php?u=" + ctx.link;
				addLoc(a1, file$4, 9, 5, 426);
				i2.className = "icon-vk svelte-1cva6jy";
				addLoc(i2, file$4, 10, 88, 648);
				a2.className = "gmx-link_icon svelte-1cva6jy";
				a2.target = "_blank";
				a2.href = a2_href_value = "//vkontakte.ru/share.php?url" + ctx.link;
				addLoc(a2, file$4, 10, 5, 565);
				div1.className = "shareDialog-row shareDialog-title svelte-1cva6jy";
				addLoc(div1, file$4, 6, 4, 204);
				input0.className = "shareDialog-inputPermalinkUrl svelte-1cva6jy";
				setAttribute(input0, "type", "text");
				input0.readOnly = "readonly";
				input0.value = ctx.link;
				addLoc(input0, file$4, 14, 6, 756);
				i3.className = "icon-link-ext svelte-1cva6jy";
				i3.title = "открыть в новом окне";
				addLoc(i3, file$4, 15, 61, 910);
				a3.className = "gmx-link_icon svelte-1cva6jy";
				a3.target = "_blank";
				a3.href = ctx.link;
				addLoc(a3, file$4, 15, 6, 855);
				div2.className = "gmx-table";
				addLoc(div2, file$4, 13, 5, 726);
				div3.className = "shareDialog-row svelte-1cva6jy";
				addLoc(div3, file$4, 12, 4, 691);
				div4.className = "shareDialog-row bold svelte-1cva6jy";
				addLoc(div4, file$4, 18, 4, 1000);
				addListener(input1, "change", change_handler);
				input1.className = " svelte-1cva6jy";
				setAttribute(input1, "type", "number");
				input1.value = ctx.frameWidth;
				addLoc(input1, file$4, 21, 7, 1155);
				span1.className = "shareDialog-resolutionCross";
				addLoc(span1, file$4, 22, 7, 1256);
				addListener(input2, "change", change_handler_1);
				input2.className = " svelte-1cva6jy";
				setAttribute(input2, "type", "number");
				input2.value = ctx.frameHeight;
				addLoc(input2, file$4, 23, 7, 1314);
				addLoc(span2, file$4, 25, 7, 1473);
				i4.className = "icon-link-ext svelte-1cva6jy";
				addLoc(i4, file$4, 25, 32, 1498);
				span3.className = "shareDialog-validationError hidden svelte-1cva6jy";
				addLoc(span3, file$4, 24, 6, 1416);
				a4.className = "shareDialog-previewLink gmx-link svelte-1cva6jy";
				a4.href = a4_href_value = "" + ctx.link + "&edit=1";
				a4.target = "_blank";
				addLoc(a4, file$4, 28, 7, 1634);
				i5.className = "gmx-icon icon-link-ext svelte-1cva6jy";
				addLoc(i5, file$4, 28, 114, 1741);
				span4.className = "shareDialog-previewLinkCell constrLink shareDialog-validationOk svelte-1cva6jy";
				addLoc(span4, file$4, 27, 6, 1548);
				div5.className = "gmx-table shareDialog-resolutionTable svelte-1cva6jy";
				addLoc(div5, file$4, 20, 5, 1096);
				div6.className = "shareDialog-row svelte-1cva6jy";
				addLoc(div6, file$4, 19, 4, 1061);
				textarea.className = "shareDialog-validationOk svelte-1cva6jy";
				textarea.readOnly = "readonly";
				textarea.value = textarea_value_value = "<iframe src=\"" + ctx.link + "\" width=\"" + ctx.frameWidth + "\" height=\"" + ctx.frameHeight + "\"></iframe>";
				addLoc(textarea, file$4, 33, 5, 1856);
				div7.className = "alertWidget ui-widget";
				addLoc(div7, file$4, 34, 57, 2074);
				div8.className = "shareDialog-validationErrorView hidden svelte-1cva6jy";
				addLoc(div8, file$4, 34, 5, 2022);
				div9.className = "shareDialog-row svelte-1cva6jy";
				addLoc(div9, file$4, 32, 4, 1821);
				a5.className = "shareDialog-previewLink gmx-link svelte-1cva6jy";
				a5.href = a5_href_value = "//winnie.kosmosnimki.ru/2.0/iframePreview.html?width=" + ctx.frameWidth + "&height=" + ctx.frameHeight + "&url=" + ctx.link;
				a5.target = "_blank";
				addLoc(a5, file$4, 38, 6, 2246);
				i6.className = "gmx-icon icon-link-ext svelte-1cva6jy";
				addLoc(i6, file$4, 38, 195, 2435);
				span5.className = "shareDialog-previewLinkCell shareDialog-validationOk svelte-1cva6jy";
				addLoc(span5, file$4, 37, 5, 2172);
				div10.className = "shareDialog-row svelte-1cva6jy";
				addLoc(div10, file$4, 36, 4, 2137);
				div11.className = "shareDialog";
				addLoc(div11, file$4, 5, 3, 174);
				div12.className = "shareDialogContainer";
				addLoc(div12, file$4, 4, 2, 136);
				div13.className = "popover-content svelte-1cva6jy";
				addLoc(div13, file$4, 3, 1, 104);
				div14.className = "share svelte-1cva6jy";
				addLoc(div14, file$4, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, div14, anchor);
				append(div14, div0);
				append(div14, text0);
				if (if_block) if_block.m(div14, null);
				append(div14, text1);
				append(div14, div13);
				append(div13, div12);
				append(div12, div11);
				append(div11, div1);
				append(div1, span0);
				append(div1, text3);
				append(div1, a0);
				append(a0, i0);
				append(div1, text4);
				append(div1, a1);
				append(a1, i1);
				append(div1, text5);
				append(div1, a2);
				append(a2, i2);
				append(div11, text6);
				append(div11, div3);
				append(div3, div2);
				append(div2, input0);
				append(div2, text7);
				append(div2, a3);
				append(a3, i3);
				append(div11, text8);
				append(div11, div4);
				append(div11, text10);
				append(div11, div6);
				append(div6, div5);
				append(div5, input1);
				append(div5, text11);
				append(div5, span1);
				append(div5, text13);
				append(div5, input2);
				append(div5, text14);
				append(div5, span3);
				append(span3, span2);
				append(span3, i4);
				append(div5, text16);
				append(div5, span4);
				append(span4, a4);
				append(a4, text17);
				append(span4, i5);
				append(div11, text18);
				append(div11, div9);
				append(div9, textarea);
				append(div9, text19);
				append(div9, div8);
				append(div8, div7);
				append(div11, text20);
				append(div11, div10);
				append(div10, span5);
				append(span5, a5);
				append(a5, text21);
				append(span5, i6);
				current = true;
			},

			p: function update(changed, ctx) {
				if (ctx.title) {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block$2(component, ctx);
						if_block.c();
						if_block.m(div14, text1);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}

				if ((changed.link) && a0_href_value !== (a0_href_value = "//www.twitter.com/share?url=" + ctx.link)) {
					a0.href = a0_href_value;
				}

				if ((changed.link) && a1_href_value !== (a1_href_value = "https://www.facebook.com/sharer/sharer.php?u=" + ctx.link)) {
					a1.href = a1_href_value;
				}

				if ((changed.link) && a2_href_value !== (a2_href_value = "//vkontakte.ru/share.php?url" + ctx.link)) {
					a2.href = a2_href_value;
				}

				if (changed.link) {
					input0.value = ctx.link;
					a3.href = ctx.link;
				}

				if (changed.frameWidth) {
					input1.value = ctx.frameWidth;
				}

				if (changed.frameHeight) {
					input2.value = ctx.frameHeight;
				}

				if ((changed.link) && a4_href_value !== (a4_href_value = "" + ctx.link + "&edit=1")) {
					a4.href = a4_href_value;
				}

				if ((changed.link || changed.frameWidth || changed.frameHeight) && textarea_value_value !== (textarea_value_value = "<iframe src=\"" + ctx.link + "\" width=\"" + ctx.frameWidth + "\" height=\"" + ctx.frameHeight + "\"></iframe>")) {
					textarea.value = textarea_value_value;
				}

				if ((changed.frameWidth || changed.frameHeight || changed.link) && a5_href_value !== (a5_href_value = "//winnie.kosmosnimki.ru/2.0/iframePreview.html?width=" + ctx.frameWidth + "&height=" + ctx.frameHeight + "&url=" + ctx.link)) {
					a5.href = a5_href_value;
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div14);
				}

				if (if_block) if_block.d();
				removeListener(input1, "change", change_handler);
				removeListener(input2, "change", change_handler_1);
			}
		};
	}

	// (3:1) {#if title}
	function create_if_block$2(component, ctx) {
		var h3, text;

		return {
			c: function create() {
				h3 = createElement("h3");
				text = createText(ctx.title);
				h3.className = "popover-title";
				addLoc(h3, file$4, 2, 12, 59);
			},

			m: function mount(target, anchor) {
				insert(target, h3, anchor);
				append(h3, text);
			},

			p: function update(changed, ctx) {
				if (changed.title) {
					setData(text, ctx.title);
				}
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(h3);
				}
			}
		};
	}

	function Share(options) {
		this._debugName = '<Share>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign(data$4(), options.data);

		this._recompute({ conf: 1 }, this._state);
		if (!('conf' in this._state)) console.warn("<Share> was created without expected data property 'conf'");
		if (!('title' in this._state)) console.warn("<Share> was created without expected data property 'title'");

		if (!('frameWidth' in this._state)) console.warn("<Share> was created without expected data property 'frameWidth'");
		if (!('frameHeight' in this._state)) console.warn("<Share> was created without expected data property 'frameHeight'");
		this._intro = !!options.intro;

		this._fragment = create_main_fragment$4(this, this._state);

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}

		this._intro = true;
	}

	assign(Share.prototype, protoDev);

	Share.prototype._checkReadOnly = function _checkReadOnly(newState) {
		if ('link' in newState && !this._updatingReadonlyProperty) throw new Error("<Share>: Cannot set read-only property 'link'");
	};

	Share.prototype._recompute = function _recompute(changed, state) {
		if (changed.conf) {
			if (this._differs(state.link, (state.link = link(state)))) changed.link = true;
		}
	};

	/* src/App.html generated by Svelte v2.16.1 */

	const serverBase$1 = window.serverBase || '//maps.kosmosnimki.ru/',
		chkPar = (key, h1, h2, zn) => h1[key] || (key in h2 ? h2[key] : zn || true);
	function data$5() {
		return {
			share: false,
			conf: '',
			urlParams: {},
			dropdownMenu: [
				{ name: 'refresh', title: 'Refresh' },
				{ name: 'link', title: 'Share', checked: false }
			],
			map: null,
			permalink: null
		}
	}
	var methods$3 = {
		checkMe(it, node) {
			let cmd = it.name,
				json = this.editor.getValue(),
				out = null;
			try {
				out = JSON.parse(json);
			} catch (err) {
				let error = this.editor.getSession().getAnnotations()[0];
				alert('Ошибка в конфигурации:\n строка: ' + error.row + '\n позиция: ' + error.column + '\n сообщение: ' + error.text);
				console.log('error in json: ' , error);
			}
			if (out) {
				if (cmd === 'refresh') {
					this.set({permalink: out});
				} else if (cmd === 'link') {
					let {share} = this.get();
					if (share) {
						node.classList.remove('checked');
						this.set({share: false});
					} else {
						node.classList.add('checked');
						fetch(serverBase$1 + 'TinyReference/Create.ashx', {
							method: 'post',
							headers: {'Content-type': 'application/x-www-form-urlencoded'},
							body: L.gmxUtil.getFormData({WrapStyle: 'None', content: out}),
							mode: 'cors',
							credentials: 'include'
						})
						.then(res => res.json())
						.then(json => {
							if (json.Status === 'ok') {
								this.set({share: true, conf:json.Result});
							}
						})
						.catch(console.error);
					}
				}
			}
		},
		checkPermalink(out) {
			let {urlParams} = this.get();
			// console.log('?config=7ZSC4  dddddddd', out, urlParams)
			if (out.app) {
				out.app.theme = chkPar('theme', urlParams, out.app, 'dark');		// тема по умолчанию
				out.app.iconSidebar = chkPar('iconSidebar', urlParams, out.app);	// iconSidebar по умолчанию
				out.app.treeView = chkPar('treeView', urlParams, out.app);			// treeView по умолчанию
				out.app.iconLayers = chkPar('iconLayers', urlParams, out.app);		// iconLayers по умолчанию
				out.app.drawing = chkPar('drawing', urlParams, out.app);			// drawing по умолчанию
				//out.app.gmxTimeline = chkPar('gmxTimeline', urlParams, out.app);	// gmxTimeline по умолчанию
				out.app.gmxTimeline = urlParams.gmxTimeline === 'true' || out.app.gmxTimeline || false;	// gmxTimeline по умолчанию false
			}
			this.set({permalink: out});
			// this.set({permalink: out, confStr: JSON.stringify(out, null, 2)});
			if (urlParams.edit) {
				L.gmxUtil.requestLink('//cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js', {
					// integrity: 'sha256-kCykSp9wgrszaIBZpbagWbvnsHKXo4noDEi6ra6Y43w=',
					// crossorigin: 'anonymous'
				}).then(() => {
					var editor = ace.edit("editor");
					editor.setTheme("ace/theme/monokai");
					// editor.session.setMode("ace/mode/json");
					editor.getSession().setMode("ace/mode/json");

	 // editor.setOptions({
	    // mode: "ace/mode/json",
	    // theme: "ace/theme/monokai",
	    // fontSize: "10pt",
	    // showPrintMargin : false,
	    // enableBasicAutocompletion: true,
	    // enableSnippets: true,
	    // enableLiveAutocompletion: true,
	    // wrap: true,
	    // scrollPastEnd: true,
	    // displayIndentGuides: true,
	  // });
					// editor.session.setMode("ace/mode/javascript");
					editor.container.getElementsByClassName('ace_scrollbar-v')[0].style.width = '4px';
					editor.setValue(JSON.stringify(out, null, 2));
					this.editor = editor;
					// window.ted = editor;
				}).catch(console.warn);

			}
			if (out.app.gmxTimeline && out.app.gmxTimeline !== 'false') {
				L.gmxUtil.requestLink('//maps.kosmosnimki.ru/api/plugins/timeline/2.9.1/timeline.js');
				L.gmxUtil.requestLink('//maps.kosmosnimki.ru/api/plugins/timeline/2.9.1/timeline.css');
				// L.gmxUtil.requestLink('L.Control.gmxTimeLine.js');
				L.gmxUtil.requestLink('//maps.kosmosnimki.ru/api/plugins/external/GMXPluginTimeLine/L.Control.gmxTimeLine.js');
				L.gmxUtil.requestLink('//maps.kosmosnimki.ru/api/plugins/external/GMXPluginTimeLine/L.Control.gmxTimeLine.css');
			}
		},
		getPermalink(id) {
			let out = {};
			if (id) {
				fetch(serverBase$1 + 'TinyReference/Get.ashx?WrapStyle=None&id=' + id, {
					mode: 'cors',
					credentials: 'include'
				})
				.then(res => res.json())
				.then(json => {
					if (json.Status === 'ok') {
						out = json.Result ? JSON.parse(json.Result) : {};
					}
					this.checkPermalink(out);
				});
					// .catch(err => console.log(err));
			// } else {
				// setTimeout(function() {
					// this.checkPermalink(out);
				// }.bind(this), 0);
			}
		}
	};

	function onstate$2({ changed, current, previous }) {
		// console.log('in onstate', changed, current, previous);
		if (changed.urlParams) {
			let conf = current.urlParams.config || 'M6QMS';
			this.getPermalink(conf);
		}
	}
	const file$5 = "src/App.html";

	function click_handler(event) {
		const { component, ctx } = this._svelte;

		component.checkMe(ctx.it, this);
	}

	function get_each_context$1(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.it = list[i];
		return child_ctx;
	}

	function create_main_fragment$5(component, ctx) {
		var text0, div, map_updating = {}, text1, text2, if_block2_anchor, current;

		var if_block0 = (ctx.urlParams.edit) && create_if_block_2$1(component, ctx);

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

		var if_block1 = (ctx.share) && create_if_block_1$1(component, ctx);

		var if_block2 = (ctx.permalink && ctx.permalink.app && ctx.permalink.app.gmxTimeline) && create_if_block$3(component, ctx);

		return {
			c: function create() {
				if (if_block0) if_block0.c();
				text0 = createText("\n");
				div = createElement("div");
				map._fragment.c();
				text1 = createText("\n");
				if (if_block1) if_block1.c();
				text2 = createText("\n\n");
				if (if_block2) if_block2.c();
				if_block2_anchor = createComment();
				div.className = "editor-viewerContainer editor_sidebarExpanded svelte-gw2s3e";
				addLoc(div, file$5, 17, 0, 486);
			},

			m: function mount(target, anchor) {
				if (if_block0) if_block0.m(target, anchor);
				insert(target, text0, anchor);
				insert(target, div, anchor);
				map._mount(div, null);
				insert(target, text1, anchor);
				if (if_block1) if_block1.m(target, anchor);
				insert(target, text2, anchor);
				if (if_block2) if_block2.m(target, anchor);
				insert(target, if_block2_anchor, anchor);
				current = true;
			},

			p: function update(changed, _ctx) {
				ctx = _ctx;
				if (ctx.urlParams.edit) {
					if (if_block0) {
						if_block0.p(changed, ctx);
					} else {
						if_block0 = create_if_block_2$1(component, ctx);
						if_block0.c();
						if_block0.m(text0.parentNode, text0);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				var map_changes = {};
				if (changed.permalink) map_changes.permalink = ctx.permalink;
				if (!map_updating.map && changed.map) {
					map_changes.map = ctx.map ;
					map_updating.map = ctx.map  !== void 0;
				}
				map._set(map_changes);
				map_updating = {};

				if (ctx.share) {
					if (if_block1) {
						if_block1.p(changed, ctx);
					} else {
						if_block1 = create_if_block_1$1(component, ctx);
						if (if_block1) if_block1.c();
					}

					if_block1.i(text2.parentNode, text2);
				} else if (if_block1) {
					if_block1.o(function() {
						if_block1.d(1);
						if_block1 = null;
					});
				}

				if (ctx.permalink && ctx.permalink.app && ctx.permalink.app.gmxTimeline) {
					if (!if_block2) {
						if_block2 = create_if_block$3(component, ctx);
						if_block2.c();
						if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
					}
				} else if (if_block2) {
					if_block2.d(1);
					if_block2 = null;
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				outrocallback = callAfter(outrocallback, 2);

				if (map) map._fragment.o(outrocallback);

				if (if_block1) if_block1.o(outrocallback);
				else outrocallback();

				current = false;
			},

			d: function destroy$$1(detach) {
				if (if_block0) if_block0.d(detach);
				if (detach) {
					detachNode(text0);
					detachNode(div);
				}

				map.destroy();
				if (detach) {
					detachNode(text1);
				}

				if (if_block1) if_block1.d(detach);
				if (detach) {
					detachNode(text2);
				}

				if (if_block2) if_block2.d(detach);
				if (detach) {
					detachNode(if_block2_anchor);
				}
			}
		};
	}

	// (1:0) {#if urlParams.edit}
	function create_if_block_2$1(component, ctx) {
		var div4, div3, div1, div0, text, div2;

		var each_value = ctx.dropdownMenu;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block$1(component, get_each_context$1(ctx, each_value, i));
		}

		return {
			c: function create() {
				div4 = createElement("div");
				div3 = createElement("div");
				div1 = createElement("div");
				div0 = createElement("div");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				text = createText("\n\t\t\t");
				div2 = createElement("div");
				div0.className = "dropdownMenuWidget svelte-gw2s3e";
				addLoc(div0, file$5, 4, 3, 159);
				div1.className = "sidebarPanel-toolbarContainer svelte-gw2s3e";
				addLoc(div1, file$5, 3, 2, 112);
				div2.id = "editor";
				div2.className = "editor svelte-gw2s3e";
				addLoc(div2, file$5, 13, 3, 426);
				div3.className = "sidebarPanel svelte-gw2s3e";
				addLoc(div3, file$5, 2, 1, 83);
				div4.className = "editor-sidebarContainer editor_sidebarExpanded svelte-gw2s3e";
				addLoc(div4, file$5, 1, 0, 21);
			},

			m: function mount(target, anchor) {
				insert(target, div4, anchor);
				append(div4, div3);
				append(div3, div1);
				append(div1, div0);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(div0, null);
				}

				append(div3, text);
				append(div3, div2);
			},

			p: function update(changed, ctx) {
				if (changed.dropdownMenu) {
					each_value = ctx.dropdownMenu;

					for (var i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context$1(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block$1(component, child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(div0, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}
					each_blocks.length = each_value.length;
				}
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div4);
				}

				destroyEach(each_blocks, detach);
			}
		};
	}

	// (6:0) {#each dropdownMenu as it}
	function create_each_block$1(component, ctx) {
		var div, i, i_class_value, text0, span, text1_value = ctx.it.title, text1, div_class_value;

		return {
			c: function create() {
				div = createElement("div");
				i = createElement("i");
				text0 = createText("\n\t\t\t\t\t");
				span = createElement("span");
				text1 = createText(text1_value);
				i.className = i_class_value = "icon-" + ctx.it.name + " svelte-gw2s3e";
				addLoc(i, file$5, 7, 5, 325);
				addLoc(span, file$5, 8, 5, 361);

				div._svelte = { component, ctx };

				addListener(div, "click", click_handler);
				div.className = div_class_value = "dropdownMenuWidget-item" + (ctx.it.checked ? ' checked' : '') + " svelte-gw2s3e";
				addLoc(div, file$5, 6, 4, 223);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);
				append(div, i);
				append(div, text0);
				append(div, span);
				append(span, text1);
			},

			p: function update(changed, _ctx) {
				ctx = _ctx;
				if ((changed.dropdownMenu) && i_class_value !== (i_class_value = "icon-" + ctx.it.name + " svelte-gw2s3e")) {
					i.className = i_class_value;
				}

				if ((changed.dropdownMenu) && text1_value !== (text1_value = ctx.it.title)) {
					setData(text1, text1_value);
				}

				div._svelte.ctx = ctx;
				if ((changed.dropdownMenu) && div_class_value !== (div_class_value = "dropdownMenuWidget-item" + (ctx.it.checked ? ' checked' : '') + " svelte-gw2s3e")) {
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

	// (21:0) {#if share}
	function create_if_block_1$1(component, ctx) {
		var current;

		var share_initial_data = { conf: ctx.conf };
		var share = new Share({
			root: component.root,
			store: component.store,
			data: share_initial_data
		});

		return {
			c: function create() {
				share._fragment.c();
			},

			m: function mount(target, anchor) {
				share._mount(target, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				var share_changes = {};
				if (changed.conf) share_changes.conf = ctx.conf;
				share._set(share_changes);
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (share) share._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				share.destroy(detach);
			}
		};
	}

	// (25:0) {#if permalink && permalink.app && permalink.app.gmxTimeline}
	function create_if_block$3(component, ctx) {
		var svg, defs, clippath, rect, symbol, title, text, path;

		return {
			c: function create() {
				svg = createSvgElement("svg");
				defs = createSvgElement("defs");
				clippath = createSvgElement("clippath");
				rect = createSvgElement("rect");
				symbol = createSvgElement("symbol");
				title = createSvgElement("title");
				text = createText("gmxTimeline");
				path = createSvgElement("path");
				setAttribute(rect, "x", "0");
				setAttribute(rect, "y", "0");
				setAttribute(rect, "width", "13");
				setAttribute(rect, "height", "13");
				addLoc(rect, file$5, 28, 31, 801);
				setAttribute(clippath, "id", "clip-path");
				addLoc(clippath, file$5, 28, 6, 776);
				addLoc(defs, file$5, 26, 2, 760);
				addLoc(title, file$5, 31, 6, 923);
				setAttribute(path, "d", "M6.5,0C2.9,0,0,2.9,0,6.5S2.9,13,6.5,13S13,10.1,13,6.5S10.1,0,6.5,0z M9.8,7.3H5.7V3.3h1.6v2.4h2.4V7.3z");
				addLoc(path, file$5, 32, 1, 951);
				setAttribute(symbol, "id", "timeline-icon");
				setAttribute(symbol, "viewBox", "0 0 13 13");
				addLoc(symbol, file$5, 30, 4, 869);
				setAttribute(svg, "xmlns", "http://www.w3.org/2000/svg");
				setStyle(svg, "display", "none");
				addLoc(svg, file$5, 25, 0, 696);
			},

			m: function mount(target, anchor) {
				insert(target, svg, anchor);
				append(svg, defs);
				append(defs, clippath);
				append(clippath, rect);
				append(svg, symbol);
				append(symbol, title);
				append(title, text);
				append(symbol, path);
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(svg);
				}
			}
		};
	}

	function App(options) {
		this._debugName = '<App>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign(data$5(), options.data);
		if (!('urlParams' in this._state)) console.warn("<App> was created without expected data property 'urlParams'");
		if (!('dropdownMenu' in this._state)) console.warn("<App> was created without expected data property 'dropdownMenu'");
		if (!('permalink' in this._state)) console.warn("<App> was created without expected data property 'permalink'");
		if (!('map' in this._state)) console.warn("<App> was created without expected data property 'map'");
		if (!('share' in this._state)) console.warn("<App> was created without expected data property 'share'");
		if (!('conf' in this._state)) console.warn("<App> was created without expected data property 'conf'");
		this._intro = !!options.intro;

		this._handlers.state = [onstate$2];

		onstate$2.call(this, { changed: assignTrue({}, this._state), current: this._state });

		this._fragment = create_main_fragment$5(this, this._state);

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
		data: {
			urlParams: pars
		}
	});

	return app;

}(L));
//# sourceMappingURL=winnie_2.0.js.map
