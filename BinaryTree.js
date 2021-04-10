class BinaryNode {
    key = null
    left = null
    right = null

    constructor(key) {
        this.key = key
    }

    addLeft(key) {
        const node = new BinaryNode(key)
        this.left = node
        return node
    }

    addRight(key) {
        const node = new BinaryNode(key)
        this.right = node
        return node
    }
}

class BinaryTree {
    root = null

    constructor(key) {
        this.root = new BinaryNode(key)
    }

    traverse(node, visitFn, type = 'in-order') {
        if (node) {
            if (type === 'pre-order') visitFn(node)
            this.traverse(node.left, visitFn)
            if (type === 'in-order') visitFn(node)
            this.traverse(node.right, visitFn)
            if (type === 'post-order') visitFn(node)
        }
    }

    print() {
        let result = ''
        let visitedFn = node => result += !result.length ? node.key : ` => ${node.key} `
        this.traverse(this.root, visitedFn)
        console.log(result)
    }
}

const tree = new BinaryTree('a')
const b = tree.root.addLeft('b')
const c = tree.root.addRight('c')
const d = b.addLeft('d')
const e = b.addRight('e')
const f = c.addLeft('f')
const g = c.addRight('g')
const h = d.addLeft('h')
const i = d.addRight('i')

tree.print()
