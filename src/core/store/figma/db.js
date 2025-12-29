
import * as IDB  from 'idb';
import Constants from './constants';

/**
 * indexdb
 */
export default class DB {
    /**
     * 
     */
    #db;

    /**
     * 构造函数
     */
    constructor() {
        ;
    }

    /**
     * open db
     */
    async open() {
        this.#db = await IDB.openDB(Constants.DB, 1, {
            upgrade(db) {
                //
                // docs
                //
                if (!db.objectStoreNames.contains(Constants.TB_DOCS)) {
                    db.createObjectStore(Constants.TB_DOCS);
                }

                //
                // imgs
                //
                if (!db.objectStoreNames.contains(Constants.TB_IMGS)) {
                    db.createObjectStore(Constants.TB_IMGS);
                }
            }
        });
    }

    /**
     * 
     * insert doc
     * 
     * @param {*} key 
     * @param {*} doc 
     */
    async insertDoc(key, doc) {
        console.log("insertDoc", key, doc);
        await this.#db.add(Constants.TB_DOCS, doc, key);
    }

    /**
     * 
     * insert image
     * 
     * @param {*} key 
     * @param {*} image_buffer 
     */
    async insertImage(key, image_buffer) {
        await this.#db.add(Constants.TB_IMGS, image_buffer, key);
    }

    /**
     * 
     * get doc
     * 
     * @param {*} key 
     * @returns 
     */
    async getDoc(key) {
        return await this.#db.get(Constants.TB_DOCS, key);
    }

    /**
     * 
     * get image
     * 
     * @param {*} key 
     * @returns 
     */
    async getImage(key) {
        return await this.#db.get(Constants.TB_IMGS, key);
    }

    /**
     * delete database
     */
    async deleteDatabase() {
        await IDB.deleteDB(Constants.DB);
    }

    /**
     * close
     */
    async close() {
        await this.#db.close();
        this.#db = undefined;
    }
}
