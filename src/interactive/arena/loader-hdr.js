
import * as THREE  from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const loader = new RGBELoader();

/**
 * 
 * @param {*} url 
 */
export default async function LoadHDR(url) {
    return new Promise((resolve, reject) => {
        loader.load(url, texture => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            resolve(texture);
        });
    });
}