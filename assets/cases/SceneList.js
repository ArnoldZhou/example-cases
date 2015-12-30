cc.Class({
    extends: cc.Component,
    
    properties: {
        itemPrefab: {
            default: null,
            type: cc.Prefab
        },
    },
    
    createItem: function (x, y, w, name, url) {
        var item = cc.instantiate(this.itemPrefab);
        var label = item.getComponent(cc.Label);
        label.string = name;
        if (url) {
            item.getComponent('ListItem').url = url;
        }
        item.width = w;
        item.x = x;
        item.y = y;
        this.node.addChild(item);
    },

    // use this for initialization
    onLoad: function () {
        var scenes = cc.game._sceneInfos;
        var list = {};
        if (scenes) {
            var i, j;
            for (i = 0; i < scenes.length; ++i) {
                let url = scenes[i].url;
                let dirname = cc.path.dirname(url).replace('db://assets/cases/', '');
                let scenename = cc.path.basename(url, '.fire');
                if (scenename === 'TestList') continue;
                
                if (!dirname) dirname = '_root';
                if (!list[dirname]) {
                    list[dirname] = {};
                }
                list[dirname][scenename] = url;
            }
            
            var dirs = Object.keys(list);
            dirs.sort();
            var y = -30;
            
            for (i = 0; i < dirs.length; ++i) {
                let dirname = dirs[i];
                this.createItem(100, y, 400, dirname);
                y -= 30;
                let scenenames = Object.keys(list[dirname]);
                scenenames.sort();
                for (j = 0; j < scenenames.length; ++j) {
                    let name = scenenames[j];
                    let url = list[dirname][name];
                    this.createItem(200, y, 220, name, url);
                    y -= 30;
                }
            }
            this.node.height = Math.abs(y) + 30;
        }
    },
});