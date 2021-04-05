class Node {
    key = null
    neighbors = []

    constructor(key) {
        this.key = key
    }

    addNeighbor(node) {
        this.neighbors.push(node)
    }
}

class Graph {
    nodes = []
    edges = []
    isDirected = false

    constructor(isDirected = false) {
        this.isDirected = isDirected
    }

    addNode(key) {
        this.nodes.push(new Node(key))
    }

    getNode(key) {
        return this.nodes.find((n => n.key === key))
    }

    addEdge(node1Key, node2Key) {
        const node1 = this.getNode(node1Key)
        const node2 = this.getNode(node2Key)
        this.edges.push(`${node1Key}-${node2Key}`)
        node1.addNeighbor(node2)
        if (!this.isDirected) node2.addNeighbor(node1)
    }

    print() {
        this.nodes.map(n => console.log(`${n.key} => ${n.neighbors.map(ngh => ngh.key)}`))
    }

    bfs(startingNodeKey, visitedFn) {
        const startingNode = this.getNode(startingNodeKey)
        const visited = this.nodes.reduce((tot, n) => {
            tot[n.key] = false
            return tot
        }, {})
        const queue = [startingNode]
        while (queue.length) {
            const visitedNode = queue.pop()
            if (!visited[visitedNode.key]) {
                visitedFn(visitedNode)
                visited[visitedNode.key] = true
            }
            visitedNode.neighbors.map(ngh => {
                if (!visited[ngh.key]) queue.unshift(ngh)
            })
        }
    }

    dfs(startingNodeKey, visitedFn) {
        const startingNode = this.getNode(startingNodeKey)
        const visited = this.nodes.reduce((tot, n) => {
            tot[n.key] = false
            return tot
        }, {})
        const explore = function (node) {
            if (visited[node.key]) return
            visitedFn(node)
            visited[node.key] = true
            node.neighbors.map(ngh => explore(ngh))
        }
        explore(startingNode)
    }
}

const graph1 = new Graph()

graph1.addNode('A')
graph1.addNode('B')
graph1.addNode('C')
graph1.addNode('D')

graph1.addEdge('A', 'B')
graph1.addEdge('A', 'C')
graph1.addEdge('B', 'D')
graph1.addEdge('A', 'D')
graph1.addEdge('C', 'B')

graph1.print()



console.log('------------------------------')



const graph2 = new Graph(true)

const nodes = ['a', 'b', 'c', 'd', 'e', 'f']
const edges = [
    ['a', 'b'],
    ['a', 'e'],
    ['a', 'f'],
    ['b', 'd'],
    ['b', 'e'],
    ['c', 'b'],
    ['d', 'c'],
    ['d', 'e'],
]
nodes.map(k => graph2.addNode(k))
edges.map(dg => graph2.addEdge(...dg))

graph2.bfs('a', n => console.log(n.key))


console.log('------------------------------')



const graph3 = new Graph(true)

nodes.map(k => graph3.addNode(k))
edges.map(dg => graph3.addEdge(...dg))

graph3.dfs('a', n => console.log(n.key))
