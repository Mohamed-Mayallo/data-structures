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
}

const graph = new Graph()

graph.addNode('A')
graph.addNode('B')
graph.addNode('C')
graph.addNode('D')

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('B', 'D')
graph.addEdge('A', 'D')
graph.addEdge('C', 'B')

graph.print()

