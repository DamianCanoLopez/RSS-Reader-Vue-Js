import { defineStore } from "pinia";
import { ref } from "vue";

export const useFeedStore = defineStore('feedStore', () => {

    // states
    const feed = ref({
        // informacion de los RSS
        sources: [
            {
                id: crypto.randomUUID(),
                name: 'Mozilla Hacks',
                url: 'https://hacks.mozilla.org/feed',
            }
        ],

        // feed actual
        current: {
            source: null,
            items: null,
        }
    })

    // actions
    async function loadSource(source){
        const response = await fetch(source.url);
        let text = await response.text();
        text =  text.replace(/content:encoded/g, 'content');

        const domParser = new DOMParser();
        let doc = domParser.parseFromString(text, "text/xml");
    
        console.log(doc);
        const posts = [];

        doc.querySelectorAll('item, entry').forEach(item => {
            const post = {
                title: item.querySelector('title').textContent ?? 'Sin titulo',
                content: item.querySelector('content').textContent ?? '',
                description: item.querySelector('description').textContent ?? '',
            };

            posts.push(post);
        });
        this.feed.current.items = [...posts];
        this.feed.current.source = source;
    }

    async function registerNewSource(url){
        try{
            const response = await fetch(url);
            let text = await response.text();
            const domParser = new DOMParser();
            let doc = domParser.parseFromString(text, "text/xml");

            const title = doc.querySelector('channel title, feed title');

            const source ={
                id: crypto.randomUUID(),
                name: title.textContent,
                url,
            };

            this.feed.sources.push(source)
        }catch(e){
            console.error(e);
        }
    }

    return{feed, loadSource, registerNewSource}
})