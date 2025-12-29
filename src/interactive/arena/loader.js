
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

/**
 * 
 * @param {*} url 
 */
export default async function LoadGLB(url) {
    return new Promise((resolve, reject) => {
        loader.load(
            url, 
            gltf => {
                resolve(gltf.scene);
            },
            undefined,
            error => {
                reject(error);
            });
    });
}

