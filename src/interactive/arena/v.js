/* eslint-disable no-unused-vars */

import CustomElementRegister from '@ux/base/custom-element-register';
import Element               from '@ux/base/element';
import ElementDomCreator     from '@ux/base/element-dom-creator';
import UrlHDR                from "@assets/hdrs/christmas.hdr";
import UrlMilo               from "@assets/models/milo.glb";
import LoadGLB               from './loader';
import Renderer              from './renderer';
import Html                  from "./v-tpl.html";
const tpl = ElementDomCreator.createTpl(Html);
const tagName = 'x-biz-arena';

/**
 * 根元素
 */
export default class Arena extends Element {
    //
    // 元素
    //
    #container;
    #canvas;

    //
    // renderer
    //
    #renderer;

    //
    //
    //
    #resize_observer;

    /**
     * 构造函数
     */
    constructor() {
        super(tagName);
        this.createContentFromTpl(tpl);
    }

    /**
     * 构造
     */
    onCreate() {
        super.onCreate();
        this.#container = this.getChild('#container');
        this.#canvas    = this.getChild('#canvas'   );
        this.#renderer  = new Renderer(this.#canvas );
        this.#resize_observer = new ResizeObserver(entries => {
            this.#onCanvasResize();
        });
        this.#resize_observer.observe(this.#container);
    }

    /**
     * 
     */
    async start() {
        await this.#renderer.loadHdrFromUrl(UrlHDR);
        const model = await LoadGLB(UrlMilo);
        if (model) {
            this.#renderer.scene.add(model);
        }
        this.#renderer.start();
    }

    /**
     * 
     */
    #onCanvasResize() {
        const ratio = window.devicePixelRatio || 1;
        const w = this.#container.offsetWidth;
        const h = this.#container.offsetHeight;
        this.#canvas.width  = ratio * w;
        this.#canvas.height = ratio * h;
        this.#canvas.style.width  = `${w}px`;
        this.#canvas.style.height = `${h}px`;
        console.log(w, h, ratio);
        this.#renderer.resize(w, h, ratio);
    }
}

CustomElementRegister(tagName, Arena);
