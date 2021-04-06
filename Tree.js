class Node {
    key = null
    children = []

    constructor(key) {
        this.key = key
    }

    addChild(key) {
        const node = new Node(key)
        this.children.push(node)
        return node
    }
}

class Tree {
    root = null

    constructor(key) {
        this.root = new Node(key)
    }

    print() {
        let result = ''
        const traverse = function (node, visitFn, depth) {
            visitFn(node, depth)
            if (node.children.length) node.children.map(ch => traverse(ch, visitFn, depth + 1))
        }
        const addKeyToResult = function (node, depth) {
            result += !result.length ? node.key : `\n${' '.repeat(depth * 2)}${node.key}`
        }
        traverse(this.root, addKeyToResult, 1)
        console.log(result)
    }
}

const dom = new Tree('html')

dom.root.addChild('head')
const body = dom.root.addChild('body')

body.addChild('header')
body.addChild('main')
const footer = body.addChild('footer')
footer.addChild('span')

dom.print()

