

export  class TreeConverter{
    // constructor(data)
    // {
    //     this.data = data;
    // }

    createNode(item, parentId, i, lenght)
    {
       // console.log('deep lvl',i, item)
        parentId = parentId ? parentId.id : null
        let children =  i === lenght ? item.children : []

        return {
            id: item.id,
            parentId,
            name: item.name,
            code: item.code,
            level: item.level,
            children: children
        };
    }

    isExistInFlatNodes(flatNodes, node)
    {
        return !!flatNodes[node.id];
    }
    // { id: 10, parentId: undefined, children: [] }
    getFlatNodes(data)
    {
        const flatNodes = {};
        data.forEach(line => {
         //   console.log('data.length', data.length)
            line.forEach((el, i) => {
           //     console.log('line.length',line.length)
                const newNode = this.createNode(el, line[i - 1], i, (line.length-1));
                //  console.log(newNode)
                if (!this.isExistInFlatNodes(flatNodes, newNode)) {
                    flatNodes[newNode.id] = newNode;
                }
            });
        });
        //  console.log(flatNodes)
        return flatNodes;
    }

    getTreeFromFlatNodes(flatNodes)
    {
        const tree = [];
        const nodes = Object.values(flatNodes);
        nodes.forEach(node => {
            if (node.parentId === null) {
                tree.push(node);
            } else {
                const parentNode = flatNodes[node.parentId];
                parentNode.children.push(node);
            }
        });
        return tree;
    }

    getTree(data)
    {
       // console.log('SINA', data)
        const flatNodes = this.getFlatNodes(data);
        return this.getTreeFromFlatNodes(flatNodes);
    }
}
