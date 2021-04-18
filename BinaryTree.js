class BinaryNode {
  key = null;
  left = null;
  right = null;

  constructor(key) {
    this.key = key;
  }

  addLeft(key) {
    const node = new BinaryNode(key);
    this.left = node;
    return node;
  }

  addRight(key) {
    const node = new BinaryNode(key);
    this.right = node;
    return node;
  }
}

class BinaryTree {
  root = null;

  constructor(key) {
    this.root = new BinaryNode(key);
  }

  traverse(node, visitFn, type = "in-order") {
    if (!node) return;

    if (type === "pre-order") visitFn(node);
    this.traverse(node.left, visitFn, type);
    if (type === "in-order") visitFn(node);
    this.traverse(node.right, visitFn, type);
    if (type === "post-order") visitFn(node);
  }

  print(type = "in-order") {
    let result = "";
    let visitedFn = (node) =>
      (result += !result.length ? node.key : ` => ${node.key} `);
    this.traverse(this.root, visitedFn, type);
    console.log(result);
  }

  find(key) {
    let currentNode = this.root;
    while (currentNode) {
      if (key === currentNode.key) return true;
      if (key > currentNode.key) currentNode = currentNode.right;
      if (key < currentNode.key) currentNode = currentNode.left;
    }
    return false;
  }

  insert(key) {
    let currentNode = this.root;
    while (currentNode) {
      if (key === currentNode.key) break;
      if (key > currentNode.key) {
        if (!currentNode.right) {
          currentNode.right = new BinaryNode(key);
          break;
        }
        currentNode = currentNode.right;
      }
      if (key < currentNode.key) {
        if (!currentNode.left) {
          currentNode.left = new BinaryNode(key);
          break;
        }
        currentNode = currentNode.left;
      }
    }
  }
}

const tree = new BinaryTree("a");
const b = tree.root.addLeft("b");
const c = tree.root.addRight("c");
const d = b.addLeft("d");
const e = b.addRight("e");
const f = c.addLeft("f");
const g = c.addRight("g");
const h = d.addLeft("h");
const i = d.addRight("i");

tree.print();

const t = new BinaryTree(7);
t.insert(4);
t.insert(9);
t.insert(1);
t.insert(6);
t.insert(8);
t.insert(10);

console.log(t.find(4));

t.print("in-order");
t.print("pre-order");
t.print("post-order");