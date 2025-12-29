
import                      '@common';
import                      '@assets';
import                      '@assets/import.css';
import GlobalScope     from "@common/global-scope";
import Arena           from "./arena/v";

(() => {

    const arena = new Arena();
    try {
        arena.start();
    } catch (e) {
        console.error(e);
    }
    document.body.appendChild(arena);

})();
