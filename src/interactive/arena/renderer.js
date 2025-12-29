/* eslint-disable no-unused-vars */

import * as THREE  from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as Lodash from 'lodash';
import LoadGLB     from './loader';
import LoadHDR     from './loader-hdr';

/**
 * 
 */
export default class Renderer {
    /**
     * 
     */
    #canvas;

    /**
     * 
     */
    #canvas_renderer;

    /**
     * 
     */
    #scene;
    #camera;

    /**
     * 
     */
    #animation_handle;

    /**
     * 
     */
    #controls;

    /**
     * 
     */
    get scene() {
        return this.#scene;
    }

    /**
     * 
     * @param {*} canvas 
     */
    constructor(canvas) {
        this.#canvas = canvas;
        this.#canvas_renderer = new THREE.WebGLRenderer({
            canvas: this.#canvas,
            antialias: true,
            alpha: true,
        });
        this.#canvas_renderer.setPixelRatio(window.devicePixelRatio);
        this.#scene = new THREE.Scene();
        this.#camera = undefined;
    }

    /**
     * 
     * 尺寸发生变化
     * 
     * @param {*} w 
     * @param {*} h 
     * @param {*} pixel_ratio 
     */
    resize(w, h, pixel_ratio) {
        this.#canvas_renderer.setPixelRatio(pixel_ratio);
        this.#canvas_renderer.setSize(w, h);
        this.#camera = new THREE.PerspectiveCamera(
            75,
            w / h,
            0.1,
            10000
        );

        this.#camera.position.set(0, 2, 4);
        this.#camera.lookAt(0, 0, 0);
        if (this.#controls) {
            this.#controls.reset();
        }

        this.#controls = new OrbitControls(this.#camera, this.#canvas);
        this.#controls.enableDamping = true;
        this.#controls.dampingFactor = 0.05;
    }

    /**
     * 
     */
    #renderScene() {
        this.#animation_handle = undefined;
        if (this.#camera) {
            this.#controls.update();
            this.#canvas_renderer.render(this.#scene, this.#camera);
        }
        this.renderNextFrame();
    }

    /**
     * 
     * @param {*} url 
     */
    async loadHdrFromUrl(url) {
        const texture = await LoadHDR(url);
        this.#scene.environment = texture;
        this.#scene.background  = texture;
        this.renderNextFrame();
    }

    /**
     * 
     */
    start() {
        this.#renderScene();
    }

    /**
     * 
     */
    renderNextFrame() {
        if (Lodash.isUndefined(this.#animation_handle)) {
            this.#animation_handle = requestAnimationFrame(() => {
                this.#renderScene();
            });
        }
    }
}