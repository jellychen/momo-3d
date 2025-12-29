
import * as ETK from "es-toolkit";

/**
 * 模拟点对点
 */
export default class Connection {
    /**
     * 
     */
    #bc;

    /**
     * uid
     */
    #uid;

    /**
     * 
     */
    #on_message;

    /**
     * 
     * 接收
     * 
     * @param {any} callback
     */
    set onmessage(callback) {
        this.#on_message = callback;
    }

    /**
     * 
     * 构造函数
     * 
     * @param {*} channel 
     * @param {*} uid 
     */
    constructor(channel, uid) {
        this.#bc = new BroadcastChannel(channel);
        this.#uid = uid;
        this.#bc.onmessage = event => {
            const data = event.data;
            if (ETK.isNil(data) || !ETK.isString(data.fid)) {
                return;
            }

            //
            // check uid
            //
            if (data.uid != this.#uid) {
                return;
            }

            //
            // ping
            //
            if (ETK.isString(data.cmd) && data.cmd == "ping") {
                this.pong(data.fid);
            }

            //
            // on message
            //
            if (ETK.isFunction(this.#on_message)) {
                try {
                    this.#on_message(data);
                } catch (e) {
                    console.error(e);
                }
            }
        };
    }

    /**
     * 
     * ping
     * 
     * @param {*} uid 
     */
    ping(uid) {
        this.#bc.postMessage(
            {
                cmd : "ping",
                fid : this.#uid,
                uid : uid,
            }
        );
    }

    /**
     * 
     * pong
     * 
     * @param {*} uid 
     */
    pong(uid) {
        this.#bc.postMessage(
            {
                cmd : "pong",
                fid : this.#uid,
                uid : uid,
            }
        );
    }
}
